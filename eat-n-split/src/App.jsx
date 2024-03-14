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
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null)

  const handleAddFriend = (friend) => {
    setFriends((friends) => [...friends, friend])
    setShowAddFriend(false);
  }

  const handleShowAddFriend = () => {
    setShowAddFriend((prev) => !prev)
  }

  const handleSelection = (friend) => {
    setSelectedFriend((cur) => 
      cur?.id === friend.id ? null : friend
    )
    setShowAddFriend(false)
  }

  const handleSplitBill = (value) => {
    console.log(value)
    setFriends((friends) =>  friends.map((friend) =>{
      friend.id === selectedFriend.id ? {...friends, balance : friend.balance + value } : friend
    }))
    setSelectedFriend(null)
  }


  return <div className="app">
    <div className="sidebar">
       <FriendsList friends={friends} selectedFriend={selectedFriend} onSelectFriend={handleSelection} />
       {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend}/>}
       <Button onClick={handleShowAddFriend}>{showAddFriend ? "Close" : "Add Friend"}</Button>
    </div>
   {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill} />}
  </div>
}

function FriendsList({friends, onSelectFriend, selectedFriend}){

  return <ul>
    {
      friends.map((friend) => 
        <Friend key={friend.id} friend={friend} onSelectFriend={onSelectFriend} selectedFriend={selectedFriend} />
      )
    }
  </ul>
}

function Friend({friend, onSelectFriend, selectedFriend}){

  const isSelected = selectedFriend?.id === friend?.id

  return <li className={isSelected ? 'selected' : ""}>
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
    <Button onClick={() => onSelectFriend(friend)}>{isSelected ? "Close" : "Select"}</Button>
  </li>
}


function FormAddFriend({onAddFriend, onShowAddFriend}){
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
    onAddFriend(newFriend)
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


function FormSplitBill({selectedFriend, onSplitBill}){

  const [bill, setBill] = useState('')
  const [paidByUser, setPaidByUser] = useState('')
  const paidByFriend = bill ? bill - paidByUser : ""
  const [whoIsPaying, setWhoIsPaying] = useState('user')


  function handleSubmit(e){
    e.preventDefault()

    if(!bill || !paidByUser) return

    onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser)


  }

  return <form className="form-split-bill" onSubmit={handleSubmit}>
    <h2>Split a bill with {selectedFriend.name}</h2>
    <label htmlFor=""> 💰 Bill Value</label>
    <input type="text" value={bill} onChange={(e) => setBill(+e.target.value)} /> 

    <label htmlFor="">Your Expense</label>
    <input type="text" value={paidByUser} onChange={(e) => setPaidByUser((+e.target.value) > bill ? paidByUser : (+e.target.value))} /> 

    <label htmlFor="">{selectedFriend.name}'s Expense</label>
    <input type="text" value={paidByFriend} disabled />

    <label htmlFor="">Who is paying the bill</label>
    <select name="" id="" value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}  >
      <option value="user">You</option>
      <option value="friend">{selectedFriend.name}</option>
    </select> 
    
    <Button>Split Bill</Button>
  </form>
}