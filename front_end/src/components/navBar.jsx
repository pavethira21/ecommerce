import {FaSearch,FaSignInAlt,FaCartPlus,FaUser,FaSignOutAlt} from 'react-icons/fa'
import logo from '../assets/logo.png' ;
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from './Modal';


export default function NavBar(){
    const navigate = useNavigate()
    const uName = localStorage.getItem('userName')
    const email = localStorage.getItem('email')
    const [modal,setModal] = useState(false)
    const [cat,setcat] = useState()
    
    useEffect(()=>{
        
        
        
    },)

    function handleCart(){
        navigate('/cart')
    }
    function handleNext(){
        console.log(cat)
        
        navigate('/products')
       
    }

    function handleChange(e){
        console.log(e.target.value)
        if(e.target.value =="logOut"){
            handleLog()
        }else if(e.target.value =="delete"){
            setModal(true)
            e.target.value = ''
        }else if(e.target.value =="profile"){
            e.target.value = ''
            navigate('/account')
        }
    }

    function handleDelete(val){

     if(val){
        const input = {email:email}
        let res= fetch('http://localhost:5000/deleteUser',{
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(input)
          }).then(response => response.json())
          .then(data=> {console.log(data)
          if(data.msg =='User deleted successfully'){
            localStorage.setItem('userName'," ")
            localStorage.setItem('email'," ")
            setModal(false)
            navigate('/')
              
          }else{
            alert('Could not Delete User')
          }}
        )
      console.log(res)

      
     }else{setModal(false)}
            
          
       
      }
    
      function handleChangeSearch(e){
        console.log(e.target.value)
        setcat(e.target.value)
        
      }

    function handleLog(){
        localStorage.setItem("userName","")
        localStorage.setItem("email","")
        navigate('/login')
    }
    return(
         
            
        
        
  
       
        <>
        {console.log(cat)}
        <ul className="navBar" >
        <li style={{display:'flex'}} onClick={()=>navigate('/')}><img src={logo} style={{height:"25%",width:"25%",borderRadius:"20px"}} />
        <h3 style={{color:"white"}}>Cartopia</h3></li>
        
        <li className="searchBar" >
            
            <input name='search' style={{width:"100%"}} onChange={(e)=>handleChangeSearch(e)}  placeholder="search products"/>
    <button className="searchBtn"  onClick={handleNext}><FaSearch/></button></li>
    <li><a className="Login" style={{float:"right",}}><FaCartPlus onClick={()=>{navigate('/cart')}}/></a></li>
      {uName?<li> 
        
        <select  style={{float:"right" ,backgroundColor:"black",color:"white",WebkitAppearance:"none"}} onChange={handleChange}  >
          <option value=''  className="navbut" style={{float:"right"}} >{uName}</option>
        <option className="navbut" style={{float:"right"}} value="logOut" >&#xf08b; LogOut</option>
        <option className="navbut" style={{float:"right"}} value="profile" >&#xf2bd; Profile</option>
        <option className="navbut" style={{float:"right"}} value="delete">&#xf1f8; Delete Account</option>
        </select>
        </li>:<> <li><a className="Login" onClick={()=>{navigate('/login')}} style={{float:"right",}}><FaSignInAlt/>LogIn</a></li>
       <li><a className="Login" style={{float:"right",}} onClick={()=>{navigate('/regis')}}>SignUp</a></li></>
        }
        </ul>
        {modal&&<Modal handle={handleDelete}>You want to deactivate account?</Modal>}
        </>
        
    )
}