import {FaSearch,FaSignInAlt,FaCartPlus} from 'react-icons/fa'
import logo from '../assets/logo.png' ;
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


export default function NavBar(){
    const navigate = useNavigate()
    const uName = localStorage.getItem('userName')
    
    useEffect(()=>{
       
    })
    function handleCart(){
        navigate('/cart')
    }
    function handleLog(){
        localStorage.setItem("userName","")
        localStorage.setItem("email","")
        navigate('/login')
    }
    return(
         uName ?
            <ul className="navBar" >
        <li><img src={logo} ></img> <h3>Cartopia</h3> </li>
        <li><a className="navbut"   >Movie</a></li>
        <li><a className="navbut"  >Series</a></li>
        <li><select className="selectGenre" defaultValue={"select"}   >
        <option  value=" " disabled  >GENRE</option>
        
        
    </select></li>
        <li><select  style={{float:"right" ,backgroundColor:"black",color:"white",WebkitAppearance:"none"}} >
          <option value=''  className="navbut" style={{float:"right"}} >Name</option>
        <option className="navbut" style={{float:"right"}} value="logOut" >LogOut</option>
        <option className="navbut" style={{float:"right"}} value="delete" >Delete Account</option>
        </select></li>
        <li></li>
        </ul>:<ul className="navBar" >
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
       <li><a className="Login" onClick={()=>{navigate('/login')}} style={{float:"right",}}><FaSignInAlt/>LogIn</a></li>
       <li><a className="Login" style={{float:"right",}} onClick={()=>{navigate('/regis')}}>SignUp</a></li>
        <li></li>
        </ul>
        
        
    )
}