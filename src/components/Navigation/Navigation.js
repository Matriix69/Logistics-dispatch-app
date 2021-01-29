import './Navigation.css';

function Navigation( {onRouteChange}) {
  return (
    <div className="nav">
        <h1 onClick={() => onRouteChange('home')}>
            Green<span>s</span>365
        </h1>
        <nav >
            <ul >

                <li >
                    <p onClick={() => onRouteChange('contact')}>contact us</p> 
                </li>

                <li >
                    <p onClick={() => onRouteChange('pricing')}>pricing</p>
                </li>
            </ul>
        </nav>
    </div>
  );
}

export default Navigation;