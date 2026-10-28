import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import Home from './Component/Home'
import About from './Component/About'
import Login from './Component/Login'
import Register from './Component/Register'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
     <Route element={<MainLayout/>} > 
     
     <Route path="/" element={<Login/>}></Route>
     <Route path='/about' element={<About/>}> </Route>
     <Route path='/register' element={<Register/>}></Route>
    
     
     </Route>



      </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App