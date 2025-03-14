import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import { CartProvider } from './store/Cart-context.jsx'

createRoot(document.getElementById('root')).render(
  
    
    <BrowserRouter>
    <CartProvider>
        <App /> 
    </CartProvider>
    
    </BrowserRouter>
   
   
  
)
