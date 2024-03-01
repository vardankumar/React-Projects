import { useState } from "react";
import Item from "./Item";

export default function PackagingList({items, onDeleteItem, onToggleItem, onClearList}){

    const [sortBy, setSortBy] = useState('input')
  
    let sortedItems;
  
    if(sortBy === 'input') sortedItems = items
  
    if(sortBy === 'description') sortedItems = items.slice()
      .sort((a, b) => a.description.localeCompare(b.description))
  
    if(sortBy === 'packed') sortedItems = items.slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed))
  
    return(
      <div className="list">
        <ul>
          {sortedItems.map((item) => (
            <Item key={item.id} item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />
            ))}
        </ul>
  
        
        <div className="actions">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} >
            <option value="input">Sort by the input</option>
            <option value="description">Sort by the description</option>
            <option value="packed">Sort by the packed</option>
          </select>
          <button onClick={onClearList}>Clear List</button>
        </div>
  
      </div>
      )
  }