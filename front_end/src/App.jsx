import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Landing from './components/Landing'
import Login from './components/login'

import Registration from './components/registration'
import './App.css'
import Products from './components/products'
import Cart from './components/Cart'

function App() {
  

  return (
    <div className='App'>
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/regis' element={<Registration />} />
      <Route path='/products' element={<Products/>}/>
      <Route path='/cart' element={<Cart/>}/>
    </Routes>
      
    </div>
  )
}

export default App
