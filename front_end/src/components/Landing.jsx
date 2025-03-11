import NavBar from "./navBar"
import Ad from "./Ad"
import Footer from "./Footer"

export default function(){
    function handleClick(){
        console.log('hello')
    }
    return( 
        <>
        <NavBar/>
        <Ad/>
        <div className="headings"><h2>Category</h2></div>
        <div className="categories">
            
            <div className="categories-cards" onClick={handleClick}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb9ExmeVxO4BLkKSB-Zdhb2TYHzocY0rQtyQ&s" alt="img"/>
                <h3>Clothing</h3>
                
            </div>
            <div className="categories-cards" onClick={handleClick}>
                <img src="https://t3.ftcdn.net/jpg/01/14/56/64/360_F_114566455_cKBYtC2gKuuTdXCgZMnUvpMYm3U6OoEr.jpg"alt="img"/>
                <h3>Accessories</h3>
                
            </div>
            <div className="categories-cards" onClick={handleClick}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBDMpAlJvlbciO5em4u21B89yiMny281qjqw&s" alt="img"/>
                <h3>Electronics</h3>
                
            </div>
            <div className="categories-cards" onClick={handleClick}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb9ExmeVxO4BLkKSB-Zdhb2TYHzocY0rQtyQ&s" alt="img"/>
                <h3>Clothing</h3>
                
            </div>
            <div className="categories-cards" onClick={handleClick}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb9ExmeVxO4BLkKSB-Zdhb2TYHzocY0rQtyQ&s" alt="img"/>
                <h3>Clothing</h3>
                
            </div>
            <div className="categories-cards" onClick={handleClick}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb9ExmeVxO4BLkKSB-Zdhb2TYHzocY0rQtyQ&s" alt="img"/>
                <h3>Clothing</h3>
            </div>
            
            
        </div>
        <div className="best-sellers">
            <div className="best-seller-card">hello</div>
        </div>

        <Footer/>
        
        </>
        
    )
}