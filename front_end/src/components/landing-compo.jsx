import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Samples({category,children}){
    const [datas,setData] = useState()
    const navigate = useNavigate()
    function handleFetch(){
        
        if(category =="popularity"){
            const condition = {condition:category}
           const res = fetch(`http://localhost:5000/sortProducts`,{
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify(condition)
           })
                .then(res=>res.json())
                .then(data =>{setData(data)
      
                 })
    .catch(err=>console.log(err))
        }else if(category =='winter wear'){
            const input = {filterName:"subcategory",filters:category}
            const res = fetch(`http://localhost:5000/filterProducts`,{
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(input)
               })
                    .then(res=>res.json())
                    .then(data =>{setData(data.result)
          
                     })
        .catch(err=>console.log(err))
        }
    }
    useEffect(()=>
    {
        handleFetch()
    },[])

    function handleClick(item){
        
        localStorage.setItem("pid",item.pid)
        navigate('/singleProduct')
    }

    return(
       


        <>
        
        
        <div style={{margin:"20px"}}>
        <div className="headings"><h3 style={{padding:"10px",marginTop:"50px"}}>{children}</h3></div>
        
        <div className="Sample-data">
            {datas && datas.map((item,i)=>(
                (item.bestSellingRank?
                    <div key={i} className="Sample-data-card" onClick={()=>handleClick(item)}> 
                <p>{item.name}</p>
                <img style={{height:"200px",width:"150px"}} src={item.images } alt="img"/>
                </div>:
                <div key={i} className="Sample-data-card" onClick={()=>handleClick(item)}> 
                <p>{item.title}</p>
                <img style={{height:"200px",width:"150px"}} src={item.images[0]} alt="img"/>
                </div>

                )
                
                
            )

            )}
            
            
        </div>
        </div>
        </>
    )
}