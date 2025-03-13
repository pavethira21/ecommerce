import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Landing from './components/Landing'
import Login from './components/login'

import Registration from './components/registration'
import './App.css'
import Products from './components/products'
import Cart from './components/Cart'
import Admin from './components/Admin'
import Profile from './components/Profile'
import SingleProduct from './components/SingleProduct'

function App() {
  

  return (
    <div className='App'>
    <Routes>
      
      <Route path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/regis' element={<Registration />} />
      <Route path='/products' element={<Products/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path='/account' element={<Profile/>}/>
      <Route path='/singleProduct' element={<SingleProduct/>}/>
    </Routes>
      
    </div>
  )
}

export default App
