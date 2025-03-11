import NavBar from "./navBar";
import { useNavigate } from "react-router-dom";

export default function Cart(){
    const navigate = useNavigate()
    const uName = localStorage.getItem('userName')
    return(<>
    <NavBar/>
    {uName?" ":
    <div className="container">
        <div>Cart Empty!<a onClick={()=>{navigate('/login')}} href="">SignIn for more</a></div>
    </div>
    
    }

    </>)
}