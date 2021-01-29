import React from 'react';
import './Deliveries.css'

class Deliveries extends React.Component {


    render(){
        return (
            <div className="Deliveries-wrapper">
                <p className="text text-title header-title">Request Dispatch</p>
                <p className="text text-regular header-subtitle">Request a dispatch to pick and deliver your parcel in no time.</p>
                
                <div className="new-dispatch">
                    <div className="grid-sections">
                        <div className="section-one">
                            <div className="input-section ">
                                <p className="text text-small form-input-label">Item </p>
                                <input 
                                        className="input" 
                                        type="Text" 
                                        name="name"  
                                        id="name" 
                                />
                            </div>
                            <div className="input-section shift2">
                                <p className="text text-small form-input-label">Quantity </p>
                                <input 
                                        className="input" 
                                        type="Text" 
                                        name="quantity"  
                                        id="quantity" 
                                />
                            </div>
                        </div>

                        <div className="section-one ">
                            <div className="input-section">
                                <p className="text text-small form-input-label">Description </p>
                                <textarea 
                                        className="input"
                                        name="message"
                                        id="subject"
                                        col="4" rows="4"

                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="grid-sections"> 
                        <div className="delivery-info">
                            <p className="text text-title ">PICK UP</p>
                            <div className="input-section">
                                <p className="text text-small ">Name </p>
                                <input name="pickup_contact_name" type="text" className="input " maxLength="30" />
                            </div>
                            <div className="input-section shift2">
                                <p className="text text-small ">Phone Number </p>
                                <div >
                                    {/* <label htmlFor="number">+234 </label> */}
                                    <input style={{width: '100%'}} name="pickup_contact_phone" type="text" className="input" maxLength="16"/>
                                </div>
                            </div>
                            <div className="shift2">
                                <p className="text text-small ">Address</p>
                                    <div className="location-input input-section">
                                        <input type="text" name="phone" autoComplete="off" role="combobox" aria-autocomplete="list" aria-expanded="false" placeholder="Search Places ..." className="input" />
                                        <div className="autocomplete-dropdown-container"></div>
                                    </div>

                            </div>
                            <div className="input-section shift2">
                                <p className="text text-small ">Pickup Landmark </p>
                                <input name="pickup_landmark" type="text" className="input " maxLength="100" />
                            </div>
                        </div>

                        <div class="delivery-info">
                            <p class="text text-title ">DROP OFF</p>
                            <div class="input-section">
                                <p class="text text-small form-input-label">Name </p>
                                <input name="dropoff_contact_name" type="text" class="input " maxLength="30" />
                            </div>
                            <div class="input-section shift2">
                                <p class="text text-small ">Phone Number </p>
                                <div >
                                    {/* <label htmlFor="number">+234 </label> */}
                                    <input style={{width: '100%'}} name="pickup_contact_phone" type="text" className="input" maxLength="16"/>
                                </div>
                            </div>
                            <div class="input-section shift2">
                                <p class="text text-small ">Address</p>
                                <div class="location-input input-section">
                                    <input type="text" autoComplete="off" role="combobox" aria-autocomplete="list" aria-expanded="false" placeholder="Search Places ..." class="input" />
                                    <div class="autocomplete-dropdown-container"></div>
                                </div>
                            </div>
                            <div class="input-section shift2">
                                <p class="text text-small form-input-label">Dropoff Landmark </p>
                                <input name="dropoff_landmark" type="text" class="input " maxLength="100" />
                            </div>
                        </div>

                    </div>

                   
                    
                    <div className="button-delivery">
                        <input 
                            className="btn-primary-delivery text text-regular" 
                            type="submit"
                            value="Send Message" 
    
    
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Deliveries; 