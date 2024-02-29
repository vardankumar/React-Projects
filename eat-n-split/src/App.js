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



function App() {
  const [showAddFriend, setShowAddFriend] = useState(false)
  const [friends, setFriends] = useState(initialFriends)
  const [selectedFriend, setSelectedFriend] = useState(null)

  
  function handleShowAddFriend(){
    setShowAddFriend((show) => !show)
  }

  function handleAddFriends(friend){
    setFriends(friends => [...friends, friend])
    setShowAddFriend(false)
  }

  const handleSelection = (friend) => {
    //  setSelectedFriend(friend)
    setSelectedFriend(selected => selected?.id === friend?.id ? null : friend)
    setShowAddFriend(false)
  }

  function handleSplitBill(value){
    setFriends(friends => friends.map(friend => friend.id === selectedFriend.id ? {...friend, balance : friend.balance + value} : friend))
    setSelectedFriend(null)
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} onSelection={handleSelection} selectedFriend={selectedFriend} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriends} />}
        <button className="button" onClick={handleShowAddFriend}>{showAddFriend ? "close" : "Add Friend"}</button>
      </div>
      { selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill} key={selectedFriend.id} />}
    </div>
  );
}


function FriendsList({friends, onSelection, selectedFriend}){

  return <ul>
    {friends.map((friend) => (
      <Friend friend={friend} key={friend.id} onSelection={onSelection} selectedFriend={selectedFriend} />
    )) }
  </ul>
}


function Friend({friend, onSelection, selectedFriend}){

  const isSelected = selectedFriend?.id === friend?.id;

  return (
   <li className={isSelected ? "selected" : ""}>
    <img src={friend.image} alt={friend.name} />
    <h3>{friend.name}</h3>
    {friend.balance < 0 && (
      <p className="red">
        You owe {friend.name} ${Math.abs(friend.balance)}
      </p>
    )}
    {friend.balance > 0 && (
      <p className="green">
        {friend.name} owes you ${Math.abs(friend.balance)}
      </p>
    )}
    {friend.balance === 0 && (
      <p>
        You owe {friend.name} are even
      </p>
    )}

    <button className="button" onClick={() => onSelection(friend)}>{isSelected ? "Close" : "Select"}</button>
  </li>
)}

function FormAddFriend({onAddFriend}){

  const [name, setName] = useState('')
  const [image, setImage] = useState('https://i.pravatar.cc/48')
  const id = crypto.randomUUID()

  const handleSubmit = (e) => {
    e.preventDefault()

    if(!name || !image) return 

    const newFriend = {
      name, id, balance : 0, image : `${image}?=${id}`
    }

    onAddFriend(newFriend)
    setName("")
    setImage('https://i.pravatar.cc/48')
  }


  return <form action="" className="form-add-friend" onSubmit={handleSubmit}>
    <label htmlFor="">Friend Name</label>
    <input type="text" value={name} onChange={e => setName(e.target.value)} />
    <label htmlFor="">Image Url</label>
    <input type="text" value={image} onChange={e => setImage(e.target.value)} />
    <button className="button">Add Friend</button>

  </form>
}

function FormSplitBill({selectedFriend, onSplitBill}){

  const [bill, setBill] = useState("")
  const [paidByUser, setPaidByUser] = useState('')
  const paidByFriend = bill ? bill - paidByUser : ""
  const [whoIsPaying, setWhoIsPaying] = useState('user')

  
  function handleSubmit(e){
    e.preventDefault()

    if(!bill || !paidByUser) return
    onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser)
  }



  return (
  <form className="form-split-bill" onSubmit={handleSubmit}>
    <h2>Split a bill with {selectedFriend.name}</h2>
    <label htmlFor="">Bill Value</label>
    <input type="text" value={bill} onChange={e => setBill(+e.target.value)} />
    <label htmlFor="">Your Expenses</label>
    <input type="text" value={paidByUser} onChange={e => setPaidByUser(Number(e.target.value) > bill ? paidByUser : Number(e.target.value))} />
    <label htmlFor="">{selectedFriend.name} Expenses</label>
    <input type="text" value={bill - paidByUser} />
    <label htmlFor="">Who is paying the bill</label>
      <select value={whoIsPaying} onChange={e => setWhoIsPaying((e.target.value))}  >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
    <button className="button">Split Bill</button>
  </form>
  )
}

export default App;

