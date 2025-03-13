import { useEffect, useState } from "react"
import { FaRupeeSign,FaShoppingCart } from "react-icons/fa"
import NavBar from "./navBar";
import Footer from "./Footer";
import { useCart } from "../store/Cart-context";

export default function SingleProduct(){
    const uName = localStorage.getItem("userName")
    const pid = localStorage.getItem("pid")
    const [datas,setData] = useState()
    const cartContext = useCart();
    const { addItem } = cartContext || {};

    function handleFetch(){
        fetch(`http://localhost:5000/getProduct?pid=${pid}`)
        .then(res=>res.json())
        .then(data =>{setData(data)
         
        })
        .catch(err=>err)
    }

        useEffect(()=>{
            handleFetch()
        },[])

        console.log(datas)
        return(
           <>
           <NavBar/>
            {datas && 
                <>
           <h1>{(datas.name || datas.title)}</h1>
           <img src={(datas.name?datas.images:datas.images[0]) } alt="img"/>
           <h3>{datas.description}</h3>
           <p><FaRupeeSign /><span style={{color:'red'}}> <del>{datas.actual_price}</del></span> <span style={{color:'green'}}>{datas.salePrice}</span> <span>{datas.discount}</span></p>
            <button onClick={() => (uName? addItem(datas):navigate('/login')) } className="cart-button"><FaShoppingCart />Add to Cart</button>
           </> }
           <Footer/>
           </>
        )
}