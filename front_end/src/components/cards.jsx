import { FaCartShopping,FaRupeeSign } from "react-icons/fa6"
import './card.css'
import { CartContext } from "../store/Cart-context";
import { useEffect, useState,useContext } from "react"
import { FaShoppingCart } from "react-icons/fa";
export default function Card({data}){

  const { addItem } = useContext(CartContext);
    const [cards,setCard] = useState()
    
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
        
      <div className="card" >
      <img src={data.images[0]} alt={data.title} className="product-image" />
      <h3>{data.title}</h3>
      <p className="product-price">
          <FaRupeeSign /> {data.selling_price}
      </p>
      <button onClick={()=>(addItem(item))} className="cart-button"><FaShoppingCart />Add to Cart</button>
  </div>

    )
}