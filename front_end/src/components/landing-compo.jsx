import { useEffect, useState } from "react"

export default function Samples({category,children}){
    const [datas,setData] = useState()
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

    return(
       


        <>
        
        <div style={{margin:"20px"}}>
        <h3>{children}</h3>
        {console.log(datas)}
        <div className="Sample-data">
            {datas && datas.map((item,i)=>(
                
                <div key={i} className="Sample-data-card"> 
                <p>{item.title}</p>
                <img src={item.images[0]} alt="img"/>
                </div>
                
            )

            )}
            
            
        </div>
        </div>
        </>
    )
}