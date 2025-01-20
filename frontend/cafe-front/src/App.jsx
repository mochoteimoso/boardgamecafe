import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from '../routes/Home';
import Games from '../routes/Games';
import Events from '../routes/Events';
import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/games' element={<Games/>}/>
 {/*        <Route path='/' element={<Pricing/>}/> */}
        <Route path='/events' element={<Events/>}/>
      </Routes>
    </div>
  )
}

export default App
