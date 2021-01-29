import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import  SimpleSlider from './components/Slide/Slide';
import Comtact from './components/Contact/Contact'
import Pricing from './components/Pricing/Pricing'
import Deliveries from './components/Deliveries/Deliveries'
class App extends Component {
  constructor(){
    super();
    this.state ={
      route: 'home'
    }
  }

  onRouteChange = (route) => {
    this.setState({route: route})
  }

  render(){
    const {route} = this.state;
    return (
      <div className="wrapper">
        <Navigation onRouteChange={this.onRouteChange} />
        { route === 'home' ?
          <div>
            <SimpleSlider onRouteChange={this.onRouteChange}/>
          </div>
         
          : (
              route === 'contact' ?
            <div className="nomargin">
              <Comtact />
            </div> 
            : (
              route === 'pricing' ? 
              <div>
                <Pricing />
              </div>
              :
              <div>              
                <Deliveries />
              </div>
            )
            
          )          
        }
      </div>
    );
  }
}
  
  

export default App;
