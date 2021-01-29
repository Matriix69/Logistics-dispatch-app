import React from 'react';
import './Contact.css'

class Contact extends React.Component {


    render(){
        return (
            <div className="contact-wrapper">
                <div className="contact-wrapper-child">
                    <p className="text text-medium shift">Have Issues? Send Us a Message!</p>
                    <div className="input-section">
                            <label className="" htmlFor="name">Name</label>
                            <input 
                                className="input" 
                                type="Text" 
                                name="name"  
                                id="name" 
                            />
                    </div>

                    <div className="input-section shift2">
                            <label className="" htmlFor="name">Subject</label>
                            <input 
                                className="input" 
                                type="Text" 
                                name="subject"  
                                id="subject" 
                            />
                    </div>
                    <div className="input-section shift2">
                            <label className="" htmlFor="name">Message</label>
                            <textarea 
                                className="input"
                                name="message"
                                id="subject"

                            ></textarea>
                    </div>
                    <div className="">
                        <input 
                            className="btn-primary-contact text text-regular" 
                            type="submit"
                            value="Send Message" 
    
    
                        />
                    </div>
                </div>
                
                <div className="contact-wrapper-child">
                    <div className="contact-details">
                        <p className="text text-medium shift">Contact Details</p>

                        <a href="mailto:orders@greens365.com" target="_blank" rel="noopener noreferrer"><p className="text text-regular no-margin">orders@greens365logistics.com</p></a>
                        <a href="tel:+2348022333444"><p className="text text-regular no-margin">+234 802 233 3444</p></a>
                        <a href="tel:+23480999999999"><p className="text text-regular no-margin">+234 809 999 9999</p></a>

                    </div>

                    <div className="social-details">
                        <p className="text text-medium shift">Find Us On:</p>
                        <div className="social-media">
                            <a href="https://instagram.com/green365" target="_blank" rel="noopener noreferrer"><p className="text text-regular no-margin">@green365logistics</p></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Contact; 