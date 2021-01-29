import React, { Component } from "react";


import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './slide.css';

class SimpleSlider extends Component {
  render() {
    const {onRouteChange} = this.props;
    const settings = {
      dots: true,
      fade: true,
      infinite: true,
      speed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000
    };
    const fadeImages = [
      'img/illustration1.png',
      'img/illustration2.png',
      'img/illustration3.png'
    ]
    return (
      <div>
        <div className="homeslider">
          <Slider {...settings}>
            <div className="noClick">
              <img src={fadeImages[0]} alt=">Accessible and Affortable" />
              <p className="text text-title">Accessible and Affortable</p>
              <p className="text text-regular">Fast. Reliable. Affortable.</p>
            </div>
            <div className="noClick">
              <img src={fadeImages[1]} alt="Tested and Trusted" /> 
              <p className="text text-title">Tested and Trusted</p>
              <p className="text text-regular">Your trusted delivery partner.</p>
            </div>
            <div className="noClick">
              <img src={fadeImages[2]} alt="Safe and Secure" />
              <p className="text text-title">Safe and Secure</p>
              <p className="text text-regular">Swift and safe delivery of packages</p>
            </div>
          </Slider>
        </div>
        <div className="button">
          <button onClick={() => onRouteChange('delivery')} className="btn-primary text text-regular" type="button">Personal Deliveries</button>
          <button className="btn-inverse text text-regular" type= "button">Business Deliveries</button>
      </div>
      </div>
        
      
    );
  }
}

export default SimpleSlider;