import { useState, useEffect } from "react";
import "../../css/Bussiness.css";
import Register from "./Register";
import { MdDirectionsBike } from "react-icons/md";
import Login from "./Login";
import TermsAndConnditionModal from "./TermsAndCondition";
import classnames from "classnames";

function Bussiness({ changeLayout, authProps }) {
	const [route, setRoute] = useState(false);
	const [pageLoaded, setPageLoaded] = useState(false);

	//modal
	const [open, setOpen] = useState(false);

	const handleCloseOpen = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	//register and login route
	const onRouteChange = () => {
		setRoute(!route);
	};

	useEffect(() => {
		let timeOut = setTimeout(() => {
			setPageLoaded(true);
		}, 50);
		return () => {
			clearTimeout(timeOut);
		};
	}, []);

	return (
		<>
			<div
				className={classnames({
					"bussiness-wrapper ": true,
					"show-page": pageLoaded,
				})}
			>
				<div className="corporate-incentives">
					<p className="text text-large incentive-title">
						Have multiple deliveries to do in a day?
					</p>
					<p className="text text-regular sub-incentive">
						No problem! Rent a dispatch bike for a day at a flat fee
						of <span>N10,000</span>. Bikes come fueled.
					</p>
					<p className="text text-large incentive-title">
						Green365 Corporate gives you access to
					</p>
					<div className="sub-incentive">
						<p className="text text-medium ">
							<MdDirectionsBike /> View and keep track of order
							history
						</p>
						<p className="text text-medium ">
							<MdDirectionsBike /> Priority pick up and delivery
						</p>
						<p className="text text-medium ">
							<MdDirectionsBike /> Priority customer service
						</p>
						<p className="text text-medium ">
							<MdDirectionsBike /> Guaranteed same-day delivery
						</p>
						<p className="text text-medium ">
							<MdDirectionsBike /> Sunday Deliveries
						</p>
					</div>
				</div>

				<div className="register-section">
					<div
						className={classnames(" signup login-content ", {
							"-hide": route,
						})}
					>
						<Register
							open={open}
							handleOpen={handleOpen}
							handleCloseOpen={handleCloseOpen}
							onRouteChange={onRouteChange}
						/>
					</div>

					<div
						className={classnames(" login login-content ", {
							"-show ": route,
						})}
					>
						<Login
							authProps={authProps}
							changeLayout={changeLayout}
							onRouteChange={onRouteChange}
						/>
					</div>
				</div>
			</div>
			<TermsAndConnditionModal
				open={open}
				handleCloseOpen={handleCloseOpen}
			/>
		</>
	);
}

export default Bussiness;
