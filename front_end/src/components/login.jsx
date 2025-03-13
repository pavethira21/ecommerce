import { useState,useEffect } from 'react';
import './login.css'
import { FaEyeSlash ,FaEye} from 'react-icons/fa';



import { useNavigate } from 'react-router-dom';
import NavBar from './navBar';


function Login(){
    const [error,setError] =useState('')
    const [users,setUsers] =useState()
    const [passVisibility,setPassVisibility] = useState(false)
    const navigate = useNavigate()
    const [data,setData] = useState({
        email:"",
        pWord:""
    })
   function handleSignUp(){
        navigate('/regis')
   }
   function handleFetch(e){
    e.preventDefault()
    console.log(data.email,data.pWord)
    const inputValue = {email:data.email,password:data.pWord}
    let res= fetch('http://localhost:5000/login',{
        method:"POST",
        headers:{'content-type':'application/json'},
        body:JSON.stringify(inputValue)
      }).then(response => response.json())
      .then(data=>{ console.log(data)
    if (data.token) {
        console.log('Login successful');
        console.log('JWT Token:', data.token);
        console.log('User Data:', data.user);
        
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userName', data.user['name']);
        navigate('/')
        
    } else {
        console.log('Login failed:', data.message);
    } })
      
      
      .catch(err=>console.log(err))
      
    
    
    
  
  }
  
   
  



function handleChange(e){
 
  
      const{name,value} = e.target
      setData({
          ...data,
          [name]: value
        });
  

  
  };


    
       
    
  
    

    return(
        <>
        <NavBar/>
        <div className="container">
            
            <div className='login-box'>
           
            <div className='form-right'>
            <h2>Login</h2>
            <form>
               
                <div className="content">
                    <label htmlFor="email">UserName:</label><br/>
                    <input name="email" type="text"  onChange={handleChange}/>

                </div>
                 <div className="content"> 
                    <label htmlFor="pWord">Password:</label><br/>
                    <input name="pWord" type={passVisibility?"text":"password"} className='icon-input' onChange={handleChange} /> 
                    {passVisibility?<FaEye onClick={()=>setPassVisibility(!passVisibility)}/>:
                    <FaEyeSlash onClick={()=>setPassVisibility(!passVisibility)}/>}
                    
                     
              
                 </div>
                 <button className='userAuth' onClick={handleFetch}>LogIn</button>
            </form>
            
            <div className='link' onClick={()=>handleSignUp(e)}><a href='#'>New Customer? SignUp</a></div>
            <div className='link'><a href='#'>Forgot Password?</a></div>
            
            </div>
            
        
            </div>
        </div>
        </>
    )
}

export default Login;