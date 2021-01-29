import React from 'react';
import './Pricing.css'

class Pricing extends React.Component {


    render(){
        return (
            <div className="pricing-wrapper">
                <h2>Calculate Dispatch Cost</h2>

                <div className="order-table">
                    <div className="order-title">
                        <h3>BIKE</h3>
                    </div>

                    <div className="order-item"><span>Distance:</span><span>—</span></div>
                    <div className="order-item"><span>Base Price:</span><span>N500</span></div>
                    <div className="order-item"><span>Base Distance:</span><span>10km</span></div>
                    <div className="order-item"><span>VAT:</span><span>— (7.5%)</span></div>
                    <div className="order-footer"><h3>TOTAL PRICE:</h3><h3>N0.00</h3></div>
                </div>
                <div className="location-search">
                    <div className="input-section pricing-input">
                            <input 
                                style={{width: '100%'}}
                                className="input" 
                                type="Text" 
                                name="Pickup-Address"  
                                id="Pickup-Address" 
                                placeholder="Enter Pickup Address"
                            />
                    </div>

                    <div className="input-section pricing-input">
                            <input 
                                style={{width: '100%'}}
                                className="input" 
                                type="Text" 
                                name="DropOff-Address"  
                                id="DropOff-Address" 
                                placeholder="Enter DropOff Address"
                            />
                    </div>
                </div>
                <div className="button disabled primary">
                    <div className="">
                            <input 
                                className="btn-primary-pricing text text-regular" 
                                type="submit"
                                value="Calulate price" 
        
        
                            />
                        </div>
                </div>
            </div>
        )
    }
}

export default Pricing; 