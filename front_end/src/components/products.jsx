import NavBar from "./navBar";
import Card from "./cards";
import { FaSortAmountUpAlt,FaSortAmountDownAlt } from "react-icons/fa";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Ad from "./Ad";
import './products.css'
import Footer from "./Footer";
import { useEffect, useState } from "react";
export default function Products(){
    const settings={
        dots: true,
        infinite: false, 
        arrow:true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay:false,
        
    }

    const [datas,setData] = useState()

    // function fetchSort(e){
    //     const condition = {condition:e}
    //     console.log(condition)
    //     const res = fetch(`http://localhost:5000/sortProducts`,{
    //         method:'POST',
    //         headers:{'content-type':'application/json'},
    //         body:JSON.stringify(condition)
    //        })
    //             .then(res=>res.json())
    //             .then(data =>{setData(data)
                    
      
    //              })
    // .catch(err=>console.log(err))
    // }
    function handleFetch(e){
        
        if(e){
            const condition = {condition:e}
            console.log(condition)
        const res = fetch(`http://localhost:5000/sortProducts`,{
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify(condition)
           })
                .then(res=>res.json())
                .then(data =>{setData(data)
                    
      
                 })
    .catch(err=>console.log(err))
}
        else{
            console.log('getProducts')
        fetch(`http://localhost:5000/getProduct`)
        .then(res=>res.json())
        .then(data =>{setData(data)
          setTotalPages(data.totalPages);
        })
        .catch(err=>err)}
    }
  
   useEffect(()=>{
    handleFetch()
   },[])

    return(<>
    
    <NavBar/>
    <div className="product-container">
        <div className="filters">
            <h2>Filters</h2><hr/> 
            <div>
            <p>Sorting</p>
            <span onClick={()=>{fetchSort('price low to high')}}><FaSortAmountDownAlt/>price Low to High</span> <br></br>
            <span onClick={()=>{fetchSort('price high to low')}}><FaSortAmountUpAlt/>price High to Low</span> <br/>
            <input name="sort" type="radio" onClick={()=>fetchSort} value='Popularity'/><span>Popularity</span>
            </div>
            <p>Brand</p>
            
        </div>

        <div className="filtered-products">
        <Ad />
        <div style={{ padding: "20px", margin: "auto" }}>
        <div className="product-cards">
        
        
                { datas && datas.map((item,i)=>(<Card data={item} key={i}/>)) }
                
               
                </div>
                
           {/* {datas&&datas.map((item)=>
           <div className="card">
            <div>
                <img src={item.images[0]}alt="img"/>

            </div>
            <h3>{item.title}</h3>
            <p>{item.selling_price}</p>
           </div>
            )} */}
            
            
            
        </div>
        </div>
        </div>
        <Footer/>
    </>

    )
}