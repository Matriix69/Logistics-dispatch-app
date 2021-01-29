import './Button.css'
function Buttons() {
    return (
      <div className="button">
          <button className="btn-primary text text-regular" type="button">Personal Deliveries</button>
          <button className="btn-inverse text text-regular" type= "button">Business Deliveries</button>
      </div>
    );
  }
  
  export default Buttons;