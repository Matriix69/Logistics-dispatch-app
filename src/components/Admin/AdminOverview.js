import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ReactComponent as Shipping } from "../../images/shipping.svg";
import { ReactComponent as Settings } from "../../images/settings.svg";
import { Link } from "react-router-dom";

function Overview() {
	const history = useHistory();
	const { currentUser } = useAuth();

	useEffect(() => {
		if (currentUser?.admin === true) {
		} else {
			history.push("");
		}
	}, [currentUser, history]);

	return (
		<div>
			<div className="overview-wrapper">
				<Link
					to="/dashboard/admin/all-order"
					className="box-container yellow"
				>
					<div className="box-content">
						<p className="text text-medium ">Overview see orders</p>
						{/* <img src={orders} alt="new dispatch"/> */}
						<Shipping />
					</div>
				</Link>
				<Link
					to="/dashboard/settings"
					className="box-container light-yellow"
				>
					<div className="box-content">
						<p className="text text-medium ">Settings</p>
						{/* <img src={settings} alt="ssettings"/> */}
						<Settings />
					</div>
				</Link>
			</div>
		</div>
	);
}

export default Overview;
