import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Landing from './components/Landing'
import Login from './components/login'

import Registration from './components/registration'
import './App.css'

function App() {
  

  return (
    <div className='App'>
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/regis' element={<Registration />} />
    </Routes>
      
    </div>
  )
}

export default App
