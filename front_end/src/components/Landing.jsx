import NavBar from "./navBar"
import Ad from "./Ad"
import Footer from "./Footer"
import Slider from "react-slick"
import { useNavigate } from "react-router-dom"

export default function(){
    const navigate = useNavigate()

    function handleClick(){
        console.log('hello')
    }
    function handleLog(){
        localStorage.setItem("userName","")
        localStorage.setItem("email","")
        navigate('/login')
    }
    return( 
        <>
        <NavBar/>
        <div className="back-img"></div>
        <Ad/>
        <div>
        <div className="headings"><h2>Category</h2></div>
        
        <div className="categories">
            
            <div className="categories-cards" onClick={handleClick}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb9ExmeVxO4BLkKSB-Zdhb2TYHzocY0rQtyQ&s" alt="img"/>
                <h3>Clothing</h3>
                
            </div>
            <div className="categories-cards" onClick={handleClick}>
                <img src="https://t3.ftcdn.net/jpg/01/14/56/64/360_F_114566455_cKBYtC2gKuuTdXCgZMnUvpMYm3U6OoEr.jpg"alt="img"/>
                <h3>Accessories</h3>
                
            </div>
            <div className="categories-cards" onClick={handleClick}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBDMpAlJvlbciO5em4u21B89yiMny281qjqw&s" alt="img"/>
                <h3>Electronics</h3>
                
            </div>
            <div className="categories-cards" onClick={handleClick}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb9ExmeVxO4BLkKSB-Zdhb2TYHzocY0rQtyQ&s" alt="img"/>
                <h3>Clothing</h3>
                
            </div>
            <div className="categories-cards" onClick={handleClick}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb9ExmeVxO4BLkKSB-Zdhb2TYHzocY0rQtyQ&s" alt="img"/>
                <h3>Clothing</h3>
                
            </div>
            <div className="categories-cards" onClick={handleClick}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb9ExmeVxO4BLkKSB-Zdhb2TYHzocY0rQtyQ&s" alt="img"/>
                <h3>Clothing</h3>
            </div>
            
            
        </div>
        
        </div>
        <div>
        <h3>Best-Sellers</h3>
        <div className="best-sellers">
            
            <div className="best-seller-card"> 
                <p>kurta sets</p>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb9ExmeVxO4BLkKSB-Zdhb2TYHzocY0rQtyQ&s" alt="img"/>
            </div>
            <div className="best-seller-card"> 
                <p>Shoe</p>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb9ExmeVxO4BLkKSB-Zdhb2TYHzocY0rQtyQ&s" alt="img"/>
            </div>
        </div>
        </div>
        
        <hr/>
        <footer className="signin-footer">
        
            <div> <h3>See Personalized recommendation </h3><button onClick={handleLog}>Sign In</button></div>
            <hr/>
        </footer>
        <Footer/>
        
        </>
        
    )
}