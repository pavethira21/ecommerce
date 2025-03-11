import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function Ad(){
    const sliderSettings={
        dots: false,
        infinite: true, 
        arrow:false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplayspeed:4000
    }


    return(
    <div style={{padding:"20px"}}>
    <Slider {...sliderSettings}>
        <div className="displayAd">
            
        </div>
        <div className="displayAd">
       
        </div>
        <div className="displayAd">
        
        </div>
        <div className="displayAd">
       
        </div>
    </Slider>
    </div>
    )
}
