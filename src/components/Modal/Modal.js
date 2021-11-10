import React from 'react';
import '../../css/Modal.css';
import { BsCheckCircle } from "react-icons/bs";
import { BsXCircle } from "react-icons/bs";

function Modal({error, success, handleCloseSuccess, handleCloseError}) {
  return (error ? (
        <div className={"modal-background " + (error ? "-opened-modal" : "-closed")} 
        >
            <div className="modal-wrapper">
                <div className="modal-header">
                    <p className="text text-title">An Error Occured</p>
                </div>
                <div className="modal-content">
                    <div className="modal-body">
                        <BsXCircle style={{fontSize:"38px", color:"rgba(198, 40, 40)"}}/>
                        <p>Something went wrong, Please try again</p>
                    </div>
                    <div className="modal-footer">
                        <button onClick={handleCloseError} className="btn-close text text-regular">close</button>
                    </div>
                </div>
            </div>
        </div>
        ) : (
            success ? 
                <div className={"modal-background " + (success ? "-opened-modal" : "-closed")}
                >
                    <div className="modal-success-wrapper" >
                        <div className="modal-header">
                            <p className="text text-title">Yaay!</p>
                        </div>
                        <div className="modal-success-content">
                            <div className="modal-success-body">
                                <BsCheckCircle style={{fontSize:"40px", color:"#66cc66"}}/>
                                <p>Your message has been sent!</p>
                            </div>
                            <div className="modal-footer">
                                <button onClick={handleCloseSuccess} className="btn-close text text-regular">close</button>
                            </div>
                        </div>
                    </div>
                </div> :  null
            )
        
  );
}

export default Modal;