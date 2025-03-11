import { useState,useEffect } from 'react';
import './login.css'
import logo from '../assets/logo.png' ;


import { useNavigate } from 'react-router-dom';
import NavBar from './navBar';


function Login(){
    const navigate = useNavigate()
   function handleSignUp(){
        navigate('/regis')
   }


    
       
    
  
    

    return(
        <>
        <NavBar/>
        <div className="container">
            
            <div className='login-box'>
           
            <div className='form-right'>
            <h2>Login</h2>
            <form>
               
                <div className="content">
                    <label htmlFor="uName">UserName:</label><br/>
                    <input name="uName" type="text" />

                </div>
                 <div className="content"> 
                    <label htmlFor="pWord">Password:</label><br/>
                    <input name="pWord" type="password" className='icon-input' />
                    <i className="fa fa-eye icon" style={{color:'black'}} ></i>
                    {/* <span  onClick={handleToggle}><Icon /> </span> */}
                     
              
                 </div>
                 <button className='userAuth' >LogIn</button>
            </form>
            
            <div className='link' onClick={handleSignUp}><a href='#'>New Customer? SignUp</a></div>
            <div className='link'><a href='#'>Forgot Password?</a></div>
            
            </div>
            
        
            </div>
        </div>
        </>
    )
}

export default Login;