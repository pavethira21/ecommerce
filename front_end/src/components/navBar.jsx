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
    
    useEffect(()=>{
       
    })
    function handleCart(){
        navigate('/cart')
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
        let res= fetch('http://localhost:5000/deleteUser',{
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(email)
          }).then(response => response.json())
          .then(data=>{ console.log(data)})
      console.log(res)
      localStorage.setItem('userName'," ")
    localStorage.setItem('email'," ")
    navigate('/')
      setModal(false)
     }else{setModal(false)}
            
          
       
      }

    function handleLog(){
        localStorage.setItem("userName","")
        localStorage.setItem("email","")
        navigate('/login')
    }
    return(
         
            
        
        
  
       
        <>
        <ul className="navBar" >
        <li style={{display:'flex'}} onClick={()=>{navigate('/')}}><img src={logo} style={{height:"25%",width:"25%",borderRadius:"20px"}} />
        <h3 style={{color:"white"}}>Cartopia</h3></li>
        
        <li className="searchBar" >
            <select className="selectGenre" defaultValue={"select"}   >
        <option  value=" "  >all</option>
        <option  value=" "  >fdfgergefdfa</option>
        <option  value=" "  >afdasdasd</option>

        
        
    </select>
            <input  placeholder="search products"/>
    <button className="searchBtn" onClick={()=>{navigate('/products')}}><FaSearch/></button></li>
    <li><a className="Login" style={{float:"right",}}><FaCartPlus onClick={()=>{navigate('/cart')}}/></a></li>
      {uName?<li> 
        
        <select  style={{float:"right" ,backgroundColor:"black",color:"white",WebkitAppearance:"none"}} onChange={handleChange}  >
          <option value=''  className="navbut" style={{float:"right"}} >{uName}</option>
        <option className="navbut" style={{float:"right"}} value="logOut" >LogOut</option>
        <option className="navbut" style={{float:"right"}} value="profile" >Profile</option>
        <option className="navbut" style={{float:"right"}} value="delete" >Delete Account</option>
        </select>
        </li>:<> <li><a className="Login" onClick={()=>{navigate('/login')}} style={{float:"right",}}><FaSignInAlt/>LogIn</a></li>
       <li><a className="Login" style={{float:"right",}} onClick={()=>{navigate('/regis')}}>SignUp</a></li></>
        }
        </ul>
        {modal&&<Modal handle={handleDelete}>You want to deactivate account?</Modal>}
        </>
        
    )
}