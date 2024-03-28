import { useEffect, useState } from "react";


export function useMovies(query){
    
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const KEY = "64739d31"
    
    useEffect(function(){
        async function fetchMovies(){
         try{ 
          setIsLoading(true)
          setError("")
          const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`)
  
          if(!res.ok) throw new Error('Something went wrong with fetching movies.')
  
          const data = await res.json()
  
          if (data.Response === 'False') {
            throw new Error('Movie not found')
          }
  
          setMovies(data.Search)
        }
          catch(err){
            console.error(err.message)
            setError(err.message)
          }
          finally{
            setIsLoading(false)
          }
      }
        if(query.length < 3){
          setMovies([])
          setError('')
          return 
        }
        fetchMovies()
      }, [query])
 
      return {movies, isLoading, error}

}