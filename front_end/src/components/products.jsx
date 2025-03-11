import NavBar from "./navBar";
import Card from "./cards";
import Ad from "./Ad";
import './products.css'
import Footer from "./Footer";
export default function Products(){
    return(<>
    
    <NavBar/>
    <div className="product-container">
        <div className="filters">
            <h2>Filters</h2><hr/>  
        </div>
        <div className="filtered-products">
            products displayed here
            <Ad />
            <Card/>
        </div>
        </div>
        <Footer/>
    </>

    )
}