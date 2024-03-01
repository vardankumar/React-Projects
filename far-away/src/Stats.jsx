




export default function Stats({items}){

    if(!items.length) return <p className="stats"><em>
      Start adding some items to your packing list
    </em></p>
  
    const numItems = items.length;
    const numberOfPackedItems = items.filter(item => item.packed).length;
    const percentAge = Math.round((numberOfPackedItems / numItems) * 100);
  
    return <footer className="stats">
      <em>
      { percentAge === 100 ? "You have got everything to go." : 
      `👜 You have ${numItems} items in your list, and you have already packed ${numberOfPackedItems} (${percentAge}%)`
      }
      </em>
    </footer>
  }