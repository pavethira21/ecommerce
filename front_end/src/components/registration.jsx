import { useState,useEffect } from 'react';
//import users from '../assets/users.json';
import logo from '../assets/logo.png' ;
import { useNavigate } from 'react-router-dom';
import { CgEnter } from 'react-icons/cg';


export default function Registration(){
    const [error,setError] =useState('')
    const [alertMessage,setAlert] =useState()
    const [passVisibility,setPassVisibility] = useState(false)
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    const genre = ['Action','Thriller','Horror','Science Fiction','Comedy','Drama','Crime','Mystery','Fantasy','Adventure','Supernatural']
    
   // console.log(users)
    const [data,setData] = useState({
        uName:"",
        pWord:"",
        email:"",
        phno:'',
        
    })
    const navigate = useNavigate()
    
      useEffect(()=>{
        if(alertMessage){
            if(alertMessage.status ==200){
                alert("User registration successful, login to access features")  
                navigate('/login')
    
            }else{
                alert("Could not register")

                
    
            }
        }
        
        
        
    
      },[alertMessage])
    function handleAdduser(){
        const inputValue ={userName:data.uName,password:data.pWord,email:data.email,phno:data.phno}
        
       let res= fetch('http://localhost:5000/Adduser',{
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(inputValue)
          }).then(data=>setAlert(data))
          
          
          
        
        }

        

    function handleChange(e){
       
        
            const{name,value} = e.target
            setData({
                ...data,
                [name]: value
              });
              
        

              
        };

     
    function handleRegister(e){
        e.preventDefault();
        if(data.uName?.length>3 && data.pWord?.length>4 && data.email?.length>6&&data.phno?.length==10 && pattern.test(data.email) ){
            //users.forEach(checkUser)
            console.log(data)
            handleAdduser()
        }
        else{
            console.log('hello')
            setError('Fill in all details')
        }
        
    }
   

   

    return(
        <div>
            
        <div className="container">
            <div className='login-box'>
            <div className='form-left'>
                <div onClick={()=>{navigate('/')}} style={{display:'flex',justifyContent:'center',alignItems:'center',cursor:"pointer"}}>
                <img src={logo} style={{height:"25%",width:"25%",borderRadius:"20px"}} />
                <h3 >Cartopia</h3>
                </div>
              
            </div>
            <div className='form-right'>
            <h2>SignUp</h2>
            <form>
               <span style={{color:'red'}}>{error}</span> 
                <div className="content">
                    <label htmlFor="uName">UserName:</label><br/>
                    <input name="uName" type="text" onChange={handleChange} required/>

                </div>
                 <div className="content"> 
                 <label htmlFor="pWord">Password:</label><br/>
                 <input name="pWord" type={passVisibility?"text":"password"}  className='icon-input' onChange={handleChange}/>
                 <i className={passVisibility?"fa fa-eye icon":"fa fa-eye-slash icon"} style={{color:'black'}} onClick={()=>(setPassVisibility(!passVisibility))}></i>
                 </div>
                 <div className="content"> 
                    <label htmlFor="email">Email:</label><br/>
                    <input name="email" type="email" onChange={handleChange} required/>
                 </div>
                 <div className="content"> 
                    <label htmlFor="phno">Email:</label><br/>
                    <input name="phno" type="number" onChange={handleChange} required/>
                 </div>
                 <div >
                 
                 </div>
                 <button className='userAuth' onClick={handleRegister}>Register</button>
            </form>
            {/* <a href='#'>Forgot Password?</a> */}
            </div>
            
        
            </div>
        </div>
        </div>
    )
}

