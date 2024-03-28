import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./Hooks/useMovies";
import { useLocalStorageState } from "./Hooks/useLocalStorageState";


const average = (arr) =>
  arr?.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  const KEY = "64739d31"


  export default function App() {

    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(null)
    const [watched, setWatched] = useState([]);
    // const [watched, setWatched] = useState(function(){
      // let storedValue = localStorage.getItem("watched");
    //   return JSON.parse(storedValue)
    // });
    
    // const [watched, setWatched] = useLocalStorageState([], 'watched');

    const { movies, isLoading, error } = useMovies(query)


    function handleSelectMovie(id){
      setSelectedId((selectedId) => id === selectedId ? null : id)
    }

    function handleCloseMovie(){
      setSelectedId(null)
    }

    function handleAddWatched(movie){
      setWatched((watched) => [...watched, movie])
      // localStorage.setItem("watched", JSON.stringify([...watched, movie]))
    }

    function handleDeleteWatched(id){
      setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
    }

    // useEffect(() => {
    //   localStorage.setItem("watched", JSON.stringify(watched))

    // }, [watched])



    return (
      <>
        <NavBar>
          
          <Search query={query} setQuery={setQuery} />
          <Numresults movies={movies}/>
          
        </NavBar>
        <Main movies={movies}>
{/* 
          <Box element={<MovieList movies={movies} />} />
          <Box element={<>
            <WatchedSummary wateched={watched} />
            <WatchedMoviesList watched={watched} />
          </>} /> */}
            <Box>
            {/* {isLoading ? <Loader/>:<MovieList movies={movies} />} */}
            {isLoading && !error && <Loader/>}
            {!isLoading && !error && <Loader/> && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}
            {error && <ErrorMessage message={error} />}
          </Box>
          <Box>
            {
              selectedId ? <MovieDetails onCloseMovie={handleCloseMovie} onAddWatched={handleAddWatched} selectedId={selectedId} watched={watched}  /> :
              <>
                <WatchedSummary wateched={watched} />
                <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched} />
              </>
            }
          </Box>
        </Main>
  
      </>
    );
  }
  

function Loader(){
  return <p className="loader">Loading...</p>
}

function ErrorMessage({message}){
  return <p className="error">
    <span>👎</span> {message}
  </p>
}


function NavBar({children}){
  return (
    <nav className="nav-bar">
      <Logo/>
      {children}
      </nav>
  )
}


function Numresults({movies}){
  return (
    <p className="num-results">
          Found <strong>{movies.length}</strong> results
        </p>
  )
}

function Logo(){
  return (
    <div className="logo">
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
        </div>
  )
}


function Search( {query, setQuery} ){

  const inputElement = useRef(null)

  useEffect(function(){

    function callback(e){

      if (document.activeElement === inputElement.current) return

      if (e.code === 'Enter'){
        inputElement.current.focus()
        setQuery('')
      }
    }

    inputElement.current.focus()

    document.addEventListener('keydown', callback)

    return () => {
      document.addEventListener('keydown', callback)
    }

  }, [setQuery])

  return (
    <input
    className="search"
    type="text"
    placeholder="Search movies..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    ref={inputElement}
  />
  )
}


function Main({children}){


  return (
    <main className="main">
      {children}
  </main>
  )
}



function WatchedSummary({watched}){


  const avgUserRating = average(watched?.map((movie) => movie.userRating));
  const avgRuntime = average(watched?.map((movie) => movie.runtime));  
  const avgImdbRating = average(watched?.map((movie) => movie.imdbRating));

  return (
    <div className="summary">
    <h2>Movies you watched</h2>
    <div>
      <p>
        <span>#️⃣</span>
        <span>{watched?.length} movies</span>
      </p>
      <p>
        <span>⭐️</span>
        <span>{avgImdbRating?.toFixed(2)}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{avgUserRating?.toFixed(2)}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{avgRuntime} min</span>
      </p>
    </div>
  </div>
  )
}

function WatchedMoviesList({watched, onDeleteWatched}){
  
  return (
    <ul className="list">
      {watched?.map((movie) => (
        <WatchedMovie onDeleteWatched={onDeleteWatched} key={movie.imdbID} movie={movie} />
      ))}
    </ul>
)
}

function WatchedMovie({movie, onDeleteWatched}){
  return (
    <li>
    <img src={movie.poster} alt={`${movie.title} poster`} />
    <h3>{movie.title}</h3>
    <div>
      <p>
        <span>⭐️</span>
        <span>{movie.imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{movie.userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{movie.runtime} min</span>
      </p>

        <button className="btn-delete"  onClick={() => onDeleteWatched(movie.imdbID)} >❌</button>

    </div>
  </li>
  )
}

function Movie({ movie, onSelectMovie}){
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
    <img src={movie.Poster} alt={`${movie.Title} poster`} />
    <h3>{movie.Title}</h3>
    <div>
      <p>
        <span>🗓</span>
        <span>{movie.Year}</span>
      </p>
    </div>
  </li>
  )
}

function MovieList({movies, onSelectMovie}) {

  return (
    <ul className="list list-movies">
        {movies?.map((movie) => (
          <Movie onSelectMovie={onSelectMovie} movie={movie}  key={movie.imdbID} />
        ))}
      </ul>
  )
}

function MovieDetails({selectedId, onCloseMovie, onAddWatched, watched}){
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userRating, setUserRating] = useState('')

  const countRef = useRef(0)

  useEffect(() => {
    if (userRating) countRef.current = countRef.current + 1
  }, [userRating])
  

  const isWatched = watched?.map(movie => movie.imdbID).includes(selectedId)
  const watchedUserRating = watched?.find((movie) => movie.imdbID === selectedId)?.userRating

  const {Title : title, Year : year, Poster : poster, Runtime : runtime, imdbRating, Plot : plot, Released : released, Actors : actors, Director : director, Genre : genre} = movie

  // const [avgRating, setAvgRating] = useState(0)


  function handleAdd(){
    const newWatchedMovie = {
      imdbID : selectedId,
      title,
      year,
      poster,
      imdbRating : Number(imdbRating),
      runtime : Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions : countRef.current
    }
    onAddWatched(newWatchedMovie)
    onCloseMovie()
    // setAvgRating(Number(imdbRating))
    // setAvgRating((avgRating) => (avgRating + userRating ) / 2)
  }

  useEffect(() => {
    async function getMovieDetails(){
      setIsLoading(true)
      try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)
        const data = await res.json()
        setMovie(data)
        setIsLoading(false)
      } catch (error) {
        console.log(error.message)
      }
    }

    getMovieDetails()


  }, [selectedId]);

  useEffect(() => {
    if (!title) return
    document.title = `Movie | ${title}`

    return () => {
      document.title = 'Movie Manager'
    }

  }, [title])

  return <div className="details" >
 { isLoading ? <Loader/>  : 
<>
 <header>
    <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
    <img src={poster} alt={`Poster of ${movie} movie`} />
    <div className="details-overview">
      <h2>{title}</h2>
      <p>{released} &bull; {runtime} </p>
      <p>{genre}</p>
      <p><span>⭐</span> {imdbRating} IMbd Rating</p>
    </div>
  </header>
  <section>
  <div className="rating">
    {
        !isWatched ?
          <>
            <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
            {userRating > 0 && <button className="btn-add" onClick={handleAdd}>+ Add to list</button>} 
          </> 
          :
      <p>You rated this movie {watchedUserRating} ⭐</p>
    }
  </div>
    <p>
      <em>{plot}</em>
    </p>
    <p>Starring {actors}</p>
    <p>Directed by {director}</p>
  </section>
</>
  }
  </div>
}


function Box({children}){

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
    <button
      className="btn-toggle"
      onClick={() => setIsOpen((open) => !open)}
    >
      {isOpen ? "–" : "+"}
    </button>
    {isOpen && children }
  </div>
  )
}



/*
function WatchedBox(){
  
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
    <button
      className="btn-toggle"
      onClick={() => setIsOpen2((open) => !open)}
    >
      {isOpen2 ? "–" : "+"}
    </button>
    {isOpen2 && (
      <>
        <WatchedSummary wateched={watched} />
        <WatchedMoviesList watched={watched} />
      </>
    )}
  </div>
  )
}

*/
