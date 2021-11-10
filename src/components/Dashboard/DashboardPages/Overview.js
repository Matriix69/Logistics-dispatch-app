import { Link } from "react-router-dom";
import { ReactComponent as Shipping } from "../../../images/shipping.svg";
import { ReactComponent as Wallet } from "../../../images/wallet.svg";
import { ReactComponent as Pending } from "../../../images/pending.svg";
import { ReactComponent as History } from "../../../images/history.svg";

function Overview() {
	return (
		<div>
			<div className="overview-wrapper">
				<Link
					to="/dashboard/new-dispatch"
					className="box-container yellow"
				>
					<div className="box-content">
						<p className="text text-regular ">
							Create New Dispatch
						</p>
						{/* <img src={png2} alt="new dispatch"/> */}
						<Shipping />
					</div>
				</Link>
				<Link
					to="/dashboard/pending-orders"
					className="box-container red"
				>
					<div className="box-content">
						<p className="text text-regular ">
							View Pending Orders
						</p>
						{/* <img src={png1} alt="pending order"/> */}
						<Pending />
					</div>
				</Link>
				<Link
					to="/dashboard/order-history"
					className="box-container light-red"
				>
					<div className="box-content">
						<p className="text text-regular ">View Order History</p>
						{/* <img src={png3} alt="order-history"/> */}
						<History />
					</div>
				</Link>
				<Link
					to="/dashboard/fund-wallet"
					className="box-container light-yellow"
				>
					<div className="box-content">
						<p className="text text-regular ">Fund Your Wallet</p>
						{/* <img src={png4} alt="ssettings"/> */}
						<Wallet />
					</div>
				</Link>
			</div>
		</div>
	);
}

export default Overview;
