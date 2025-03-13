import Footer from "./Footer";
import NavBar from "./navBar";
import { CartContext } from "../store/Cart-context";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle ,FaMinusCircle,FaRupeeSign} from "react-icons/fa";
import './cart.css'
import { useState,useContext } from "react";

export default function Cart(){
    const navigate = useNavigate()
    
    const uName = localStorage.getItem('userName')
    const {items,removeItem,updateQuantity}=useContext(CartContext);
    const totalPrice = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );


   
    return(<>
    <NavBar/>
    {uName? 
    <>
    <h2>Cart</h2>
    {items.length ===0 && <div className="container">
        <div><img style={{height:"100px",width:'auto'}} src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="cart img"/>
            <h3>Cart Empty!</h3> <a href="" onClick={()=>{navigate('/')}}> Today's Deals</a> <br/>
            </div>
    </div> }
    {
        items.length >0 && (
            <div className="cart-container">
        <div className="cart-div">
            <div className="products-details">
                products
                <hr/>
                
                <div className="pro-detail" >
                {items.map((item,i)=>(
                    <div key={i}>
                <div className="product-image">
                    <img src={item.images} alt="img"/>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    
                        <h3><FaMinusCircle style={{visibility:(item.quantity<=1?"hidden":"visible")}} onClick={()=>updateQuantity(item.title,item.quantity-1)}/> {item.quantity}
                        < FaPlusCircle style={{visibility:(item.quantity>=10?"hidden":"visible")}} onClick={()=>updateQuantity(item.title,item.quantity+1)}/></h3>
                </div>
                <div className="product-details">
                    
                        
                        
                        
                        <p>Price:<FaRupeeSign/> {item.price * item.quantity} </p>
                        <button onClick={()=>removeItem(item.title)}>Remove</button>
                        </div>
                    
                    
                </div>
                 ))}
            </div>
           
            </div>
            <div className="price-details">
                price
                <hr/>
                {/* <p>Price </p><span style={{float:"right"}}><FaRupeeSign/> 100 </span>
                <p>Discount</p><span style={{float:"right"}}><FaRupeeSign/> 20 </span>
                <p>Shipping Charge</p><span style={{float:"right"}}>free </span>
                <hr /> */}
                <h1>Total Price </h1><span style={{float:"right"}}><FaRupeeSign/> {totalPrice}</span>
            </div>
        </div>
    </div>
        )
    }
    
    <Footer/>
    </>
    :
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