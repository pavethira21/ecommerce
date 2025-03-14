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
           <div className="product-display-container">
           {datas && (
                <>
                    <div className="product-display">
                        <div className="product-image">
                            <img
                                src={datas.name ? datas.images : datas.images[0]}
                                alt="Product Image"
                                className="product-img"
                            />
                        </div>
                        <div className="product-info">
                            <h1 className="product-title">{datas.name || datas.title}</h1>
                            <p className="product-description">{datas.description}</p>
                            <div className="product-pricing">
                                <p className="price">
                                    <FaRupeeSign />
                                    <span className="original-price">
                                        <del>{datas.actual_price}</del>
                                    </span>
                                    <span className="sale-price">{datas.salePrice}</span>
                                    <span className="discount">{datas.discount}</span>
                                </p>
                            </div>
                            <button
                                onClick={() => (uName ? addItem(datas) : navigate('/login'))}
                                className="cart-button"
                            >
                                <FaShoppingCart />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </>
            )}
           </div>
           
           <Footer/>
           </>
        )
}