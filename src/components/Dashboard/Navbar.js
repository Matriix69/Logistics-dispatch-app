import { useEffect, useState } from "react";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

import SubMenu from "./SubMenu";
import { SiderbarData, AdminRoute } from "./SidebarData";
import "../../css/Navbar.css";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import Overview from "./DashboardPages/Overview";
import Dispatch from "./DashboardPages/Dispatch";
import OrderHistory from "./DashboardPages/OrderHistory";
import PendingOrder from "./DashboardPages/PendingOrder";
import About from "./DashboardPages/About";
import Support from "./DashboardPages/Support";

import { useAuth } from "../../context/AuthContext";
import FundWallet from "./DashboardPages/FundWallet";
import NotFound from "../NotFound";
import Admin from "../Admin/Admin";
import AdminOverview from "../Admin/AdminOverview";
import { PrivateRoute } from "../../utils/utils";
import { pathTitle, pathTitleIcon, LogoDark, Logo } from "./SidebarData";
import { ReactComponent as Greensexlogo } from "../../images/greensexlogo.svg";
import { ReactComponent as Greensexlogo2 } from "../../images/greensexlogo2.svg";

// const Overview = lazy(() => import("./DashboardPages/Overview"));
// const Dispatch = lazy(() => import("./DashboardPages/Dispatch"));
// const PendingOrder = lazy(() => import("./DashboardPages/PendingOrder"));
// const OrderHistory = lazy(() => import("./DashboardPages/OrderHistory"));
// const About = lazy(() => import("./DashboardPages/About"));
// const Support = lazy(() => import("./DashboardPages/Support"));
// const FundWallet = lazy(() => import("./DashboardPages/FundWallet"));
// const Admin = lazy(() => import("../Admin/Admin"));
// const AdminOverview = lazy(() => import("../Admin/AdminOverview"));

function Navbar() {
	const location = useLocation();
	const history = useHistory();

	const [active, setActive] = useState(false);

	const toggleActive = () => setActive(!active);
	const { logout, currentUser, getWalletBalance } = useAuth();

	async function signOut() {
		try {
			await logout();
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		if (!currentUser?.emailVerified === true) {
			history.push("/business");
		}
	}, [currentUser, history]);

	//move to admin page
	useEffect(() => {
		if (currentUser?.admin === true) {
			history.push("/dashboard/admin");
		}
		return;
	}, [currentUser, history]);

	//wallet balance
	useEffect(() => {
		getWalletBalance();
	}, [getWalletBalance]);

	return (
		<>
			<div className="dashNav">
				<Greensexlogo
					className="logooutter"
					style={{
						height: "auto",
						width: "140px",
						marginLeft: "1em",
					}}
				/>

				<div className="intro">
					<p className="text text-title" style={{ color: "#181C32" }}>
						{pathTitle[location.pathname]}
					</p>
				</div>

				<div className="user">
					{currentUser?.admin ? (
						<div className="userobj">
							<p className="text text-regular capitalize">
								<span>Hi, </span>Staff Greens365
							</p>
							<div className="userInitials">
								{currentUser?.displayName
									.substring(0, 1)
									.toUpperCase()}
							</div>
						</div>
					) : (
						<div className="userobj">
							<p className="text text-regular capitalize">
								<span>Hi, </span> {currentUser?.displayName}
							</p>
							<div className="userInitials">
								{currentUser?.displayName
									.substring(0, 1)
									.toUpperCase()}
							</div>
						</div>
					)}
				</div>

				<div className="header">
					{!active ? (
						<HiOutlineMenuAlt4
							className="burger1"
							style={{ outline: "none" }}
							onClick={toggleActive}
						/>
					) : (
						<IoMdClose className="burger1" onClick={toggleActive} />
					)}
				</div>

				<div
					className={
						"SidebarNav " + (active ? "shownav" : "siderbar")
					}
				>
					<div
						className="SidebarWrap"
						onClick={active ? toggleActive : null}
					>
						<div
							className="header1"
							onClick={() => history.push("/")}
						>
							<Greensexlogo2
								className=""
								style={{
									height: "auto",
									width: "180px",
									// marginLeft: "1em",
								}}
							/>
						</div>

						{currentUser?.admin
							? AdminRoute.map((item, index) => {
									return (
										<div key={index}>
											{" "}
											<SubMenu
												item={item}
												index={index}
												signOut={signOut}
												key={index}
											/>
											{item.title === "Orders" ? (
												<div
													key={index + 9}
													className="divider"
												></div>
											) : null}{" "}
										</div>
									);
							  })
							: SiderbarData.map((item, index) => {
									return (
										<div key={index}>
											{" "}
											<SubMenu
												item={item}
												index={index}
												signOut={signOut}
												key={index}
											/>
											{item.title === "About GreensEx" ? (
												<div
													key={index + 9}
													className="divider"
												></div>
											) : null}{" "}
										</div>
									);
							  })}
					</div>
				</div>
			</div>

			<div className="pre-Content">
				<div className="Content">
					<div
						className={active ? "dashboard-overlay" : "displayNone"}
						onClick={toggleActive}
					></div>

					<div className="title-section">
						<>
							{pathTitleIcon[location.pathname]}{" "}
							<p className="text text-regular">
								{pathTitle[location.pathname]}
							</p>
						</>
					</div>
					<Switch>
						<PrivateRoute>
							<Route
								exact
								path="/dashboard"
								component={Overview}
							/>
							<Route
								exact
								path="/dashboard/new-dispatch"
								component={Dispatch}
							/>
							<Route
								exact
								path="/dashboard/order-history"
								component={OrderHistory}
							/>
							<Route
								exact
								path="/dashboard/pending-orders"
								component={PendingOrder}
							/>
							<Route
								exact
								path="/dashboard/fund-wallet"
								component={FundWallet}
							/>
							<Route
								exact
								path="/dashboard/about"
								component={About}
							/>
							<Route
								exact
								path="/dashboard/support"
								component={Support}
							/>
							<Route
								exact
								path="/dashboard/settings"
								component={Support}
							/>
							<Route
								exact
								path="/dashboard/admin"
								component={AdminOverview}
							/>
							<Route
								exact
								path="/dashboard/admin/all-order"
								component={Admin}
							/>
						</PrivateRoute>
						<Route component={NotFound} />
					</Switch>
				</div>
			</div>
		</>
	);
}

export default Navbar;
