import React, { useEffect, useState } from 'react';
import NavBar from './navBar';

export default function Profile(){

    const [userData, setUserData] = useState(null);
    const [data,setData] = useState({
        
        address:"",
       
        phno:'',
        age:""

})
function handleUpuser(){
    const inputValue ={userName:data.uName,password:data.pWord,email:data.email,phno:data.phno}
    
   let res= fetch('http://localhost:5000/Upuser',{
        method:"POST",
        headers:{'content-type':'application/json'},
        body:JSON.stringify(inputValue)
      }).then(data=>setAlert(data))
      
    }
      
    

function handleSubmit(e){
    e.preventDefault();
    handleUpuser()
    console.log(data)
   
}
    function handleChange(e){
        const{name,value} = e.target
            setData({
                ...data,
                [name]: value
              });
    }

    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('authToken'); 
                console.log(token)
                if (!token) {
                    setError('User is not authenticated');
                    setLoading(false);
                    return;
                }

                const response = await fetch('http://localhost:5000/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }

                const data = await response.json();
                setUserData(data);
            } catch (err) {
                setError(err.message);
            } 
        };

        fetchUserData();
    }, []);

    
    


    return (
        <>
        <NavBar/>{userData &&
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>Profile</h2>
        <div style={{ marginBottom: '15px' }}>
            
        </div>
        <form onSubmit={handleSubmit}>
        <div>
            <strong>Name:</strong><input   value= {userData.userName} disabled/>
        </div>
        <div>
            <strong>Email:</strong> <input  value={userData.email} disabled/>
        </div>
        <div>
            <strong>Phone:</strong><input name="phno" onChange={handleChange}  placeholder={userData.phno}/>
        </div>
        <div>
            <strong>Address:</strong><input name="address" onChange={handleChange} placeholder ={userData.address}/>
        </div>
        <div>
            <strong>Age:</strong><input name="age" onChange={handleChange} placeholder= {userData.age}/>
        </div>
        <button type='submit'>Update Profile</button>
        </form>

    </div>

        }
                </>
    );
};
//


