import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Laptop", quantity: 1, packed: true },
];


export default function App() {
  return (
    <div className="app">
      <Logo/>
      <Form/>
      <PackagingList/>
      <Stats/>
    </div>
  )
}


function Logo(){
  return <h1>🌴 Far Away 💼</h1>
}

function Form(){

  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState()

  function handleSubmit(e){
    e.preventDefault()
    if(!description) return
    const newItem = {
      description,
      quantity,
      packed : false,
      id : Date.now()
    }
    console.log(newItem)
    initialItems.push(newItem)
    setDescription("")
    setQuantity(1)
  }


  return <form className="add-form" onSubmit={handleSubmit}>
    <h3>
      What do you need for your trips?
    </h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
       {
          Array.from({length : 20}, (_, i) => i + 1)
          .map(num =>  <option key={num} value={num}>{num}</option>
          )
        }
      </select>
      <input type="text" placeholder="Item..." value={description} onChange={(e) =>  setDescription(e.target.value)} />
      <button>Add</button>
  </form>
}

function PackagingList(){
  return(
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item key={item.id} item={item} />
          ))}
      </ul>
    </div>
    )
}

function Item({ item }) {
  return <li>
        <span style={item.packed ? {textDecoration : "line-through"} : {}}>
          {" "}
          {item.quantity} {item.description}
        </span>
        <button className="delete">❌</button>
  </li>
}

function Stats(){
  return <footer className="stats">
    <em>
    👜 You have X items in your list, and you have already packed X (X%)
    </em>
  </footer>
}

