import { FaShoppingCart,FaRupeeSign } from "react-icons/fa"
import './card.css'

import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { useCart } from "../store/Cart-context";

export default function Card({data}){
 const uName = localStorage.getItem("userName")
  const cartContext = useCart();
  console.log(cartContext);  
  const navigate= useNavigate()
  const { addItem } = cartContext || {};
 
  // const {items,addItem,removeFromCart} = useContext(useCart);

 
  
    // const [cards,setCard] = useState()
    
//  useEffect(()=>{
//     const card = (data.map((item,i)=>(
            
//         <div className="card" key={i}>
       
          
//             <img src={item.images[0]} className="product-image"/>
              
            
         
//           <div className="title">
//             <span>{item.title}</span>
//           </div>
          
//           <div className="action">
//             <div className="price">
//               <span>Rs:{item.selling_price}</span>
//             </div>
//             <button className="cart-button" onClick={()=>(addItem(item))}>
//                 <FaCartShopping/>
//               <span>Add to cart</span>
//             </button>
//           </div>
//         </div>
//                 )
        
//                 ))
//                 setCard(card)
//  },[])
    
      
        
    return (
      
      (data.map((item,i)=>(
        
        <div className="card" key={i} >
    <img src={item.images[0]} alt={item.title} className="product-image" />
    <h3>{item.title}</h3>
    <span className="product-price">
        <FaRupeeSign /> {item.salePrice}
    </span><button onClick={() => (uName? addItem(item):navigate('/login')) } className="cart-button"><FaShoppingCart />Add to Cart</button>
    
</div>
      )))
    
    )
        

  }
