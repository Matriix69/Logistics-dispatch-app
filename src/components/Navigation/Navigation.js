import "../../css/Navigation.css";
import { Link } from "react-router-dom";
import { ReactComponent as Greensexlogo } from "../../images/greensexlogo.svg";

function Navigation() {
	return (
		<div className="nav">
			<div className="logo">
				<Link to="/">
					{/* <h1 className="text-dark">
                    Green<span>S</span>Ex
                </h1>
                <p className="text text-regular">Logistics</p> */}
					<Greensexlogo style={{ height: "auto", width: "160px" }} />
				</Link>
			</div>
			<nav className="nav-links">
				<Link to="/contact">contact us</Link>
				<div></div>
				<Link to="/pricing">pricing</Link>
			</nav>
		</div>
	);
}

export default Navigation;
