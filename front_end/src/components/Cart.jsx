import Footer from "./Footer";
import NavBar from "./navBar";
import { useNavigate } from "react-router-dom";

export default function Cart(){
    const navigate = useNavigate()
    const uName = localStorage.getItem('userName')
    return(<>
    <NavBar/>
    {uName?" ":
    <>
    <div className="container">
        <div><img style={{height:"100px",width:'auto'}} src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="cart img"/>
            <h3>Cart Empty!</h3> <a href="" onClick={()=>{navigate('/')}}> Today's Deals</a> <br/>
            <a onClick={()=>{navigate('/login')}} href="">SignIn</a></div>
    </div>
    <footer className="signin-footer">
        
            <div> <h3>See Personalized recommendation </h3><button onClick={()=>{navigate('/regis')}}>Sign Up</button></div>
            <hr/>
        </footer>
    <Footer/>
    </>
    }

    </>)
}