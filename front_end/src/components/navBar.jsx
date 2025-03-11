import {FaSearch,FaSignInAlt,FaCartPlus} from 'react-icons/fa'
import logo from '../assets/logo.png' ;


export default function NavBar(){
    const uName = localStorage.getItem('userName')
    
    return(
         uName ?
            <ul className="navBar" >
        <li><a className="navbut"  ><img src={logo} /></a></li>
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
        <li><img src={logo} style={{height:"25%",width:"25%",borderRadius:"20px"}} /></li>
        
        <li className="searchBar" >
            <select className="selectGenre" defaultValue={"select"}   >
        <option  value=" "  >all</option>
        <option  value=" "  >fdfgergefdfa</option>
        <option  value=" "  >afdasdasd</option>

        
        
    </select>
            <input  placeholder="search products"/>
    <button className="searchBtn"><FaSearch/></button></li>
    <li><a className="Login" style={{float:"right",}}><FaCartPlus/></a></li>
       <li><a className="Login" style={{float:"right",}}><FaSignInAlt/>LogIn</a></li>
       <li><a className="Login" style={{float:"right",}}>SignUp</a></li>
        <li></li>
        </ul>
        
        
    )
}