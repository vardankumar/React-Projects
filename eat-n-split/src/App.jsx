import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];



function Button({children, onClick}){
  return <button className="button" onClick={onClick}>{children}</button>
}



export default function App(){

  const [showAddFriend, setShowAddFriend] = useState(false);

  return <div className="app">
    <div className="sidebar">
       <FriendsList/>
       {showAddFriend && <FormAddFriend/>}
       <Button onClick={() => setShowAddFriend((prev) => !prev)}>{showAddFriend ? "Close" : "Add Friend"}</Button>
    </div>
    <FormSplitBill/>
  </div>
}

function FriendsList(){
  const friends = initialFriends
 
  return <ul>
    {
      friends.map((friend) => 
        <Friend  key={friend.id} friend={friend} />
      )
    }
  </ul>
}

function Friend({friend}){
  return <li>
    <img src={friend.image} alt={friend.name} />
    <h3>{friend.name}</h3>
    {friend.balance < 0 && (
      <p className="red">
        You owe {friend.name} {Math.abs(friend.balance)}
      </p>
    )}
    {friend.balance > 0 && (
      <p className="green">
        {friend.name} owes you {Math.abs(friend.balance)}
      </p>
    )}
    {friend.balance === 0 && (
      <p >
        You and {friend.name} are even
      </p>
    )}
    <Button>Select</Button>
  </li>
}


function FormAddFriend(){
  const [name, setName] = useState("")
  const [image, setImage] = useState("https://i.pravatar.cc/48")

  function handleSubmit(e){
    e.preventDefault()

    if(!name || !image) return 

    const id = crypto.randomUUID()
    const newFriend = {
      name,
      id,
      image : `${image}?=${id}`,
      balance : 0,
    }
    console.log(newFriend)
    setName('')
    setImage("https://i.pravatar.cc/48")
  }

  return <form action="" className="form-add-friend" onSubmit={handleSubmit} >
    <label htmlFor="">👫 Friend Name</label>
    <input type="text"  value={name} onChange={(e) => setName(e.target.value)} />
    <label htmlFor="">Image URL</label>
    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} /> 
    <Button>Add</Button>
  </form>
}


function FormSplitBill(){
  return <form className="form-split-bill">
    <h2>Split a bill with X</h2>
    <label htmlFor=""> 💰 Bill Value</label>
    <input type="text" /> 

    <label htmlFor="">Your Expense</label>
    <input type="text" /> 

    <label htmlFor="">X's Expense</label>
    <input type="text" disabled />

    <label htmlFor="">Who is paying the bill</label>
    <select name="" id="">
      <option value="user">You</option>
      <option value="friend">X</option>
    </select> 
    
    <Button>Split Bill</Button>
  </form>
}