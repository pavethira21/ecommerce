import NavBar from "./navBar";
import Card from "./cards";
import { FaSortAmountUpAlt,FaSortAmountDownAlt,FaStar } from "react-icons/fa";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Ad from "./Ad";
import './products.css'
import Footer from "./Footer";
import { useEffect, useState,useContext } from "react";



export default function Products(){
    const category = localStorage.getItem("category")
    const [sort,setSort] = useState('')
    const [totalPage,setTotalPages]= useState()
    const [page,setPage] = useState(1)
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
    function handleFetch(){
        
        if(sort){
            const condition = {condition:sort,page:page}
            console.log(condition)
        const res = fetch(`http://localhost:5000/sortProducts`,{
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify(condition)
           })
                .then(res=>res.json())
                .then(data =>{setData(data.records)
                    setTotalPages(data.totPage)
                    
                }
                    
      
                 )
    .catch(err=>console.log(err))
}else if(category){
    const {input} = {category:category,page:page}
    const res = fetch(`http://localhost:5000/category`,{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(input)
       })
            .then(res=>res.json())
            .then(data =>{setData(data)
                setTotalPages(data.totalPages);
  
             })
.catch(err=>console.log(err))
}
        else{
            console.log('getProductsCategory')
        fetch(`http://localhost:5000/getProduct?page=${page}`)
        .then(res=>res.json())
        .then(data =>{setData(data.result)
         setTotalPages(data.totalPages)
        })
        .catch(err=>err)}
    }
  
   useEffect(()=>{
    handleFetch()
   },[page,sort])

    return(<>
    {console.log(datas)}
    <NavBar/>
    <div className="product-container">
        <div className="filters">
            <h2>Filters</h2><hr/> 
            <div>
            <p>Sorting</p>
            <span style={{cursor:"pointer"}} onClick={()=>setSort('price low to high')}><FaSortAmountDownAlt/>price low to high</span> <br></br>
            <span  style={{cursor:"pointer"}} onClick={()=>{setSort('price high to low')}}><FaSortAmountUpAlt/>price High to Low</span> <br/>
            <span onClick={()=>setSort('popularity')} ><FaStar/> Best Seller</span>
            </div>
            <p>Brand</p>
            
        </div>

        <div className="filtered-products">
            <Ad />
            <div style={{ padding: "20px", margin: "auto" }}>
                <div className="product-cards">
        
        
                    {datas && <Card data={datas} />}
                    <div style={{padding:"20px",margin:"5%",display:"flex",justifyContent:"center",alignItems:"center"}} ><button onClick={()=>setPage(page-1)} style={{visibility:(page===1)?"hidden":"visible"}}>previous</button>
                     <span >{page}</span>
                     <button onClick={()=>setPage(page+1)} style={{visibility:(page===totalPage)?"hidden":"visible"}}>next</button>
                    </div>
                </div>
                
          
            
            
            
            </div>
        </div>
    </div>
    <Footer/>
</>

    )
}