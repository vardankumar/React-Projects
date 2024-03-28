import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import App from './App-v2'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <StarRating maxRating={5} />
    <StarRating maxRating={5} size={24} color='red' /> */}
    <App/>
  </React.StrictMode>,
)
