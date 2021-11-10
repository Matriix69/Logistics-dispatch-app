import { ReactComponent as Chart } from "../../images/chart.svg";
import { ReactComponent as Shipping } from "../../images/shipping.svg";
import { ReactComponent as Wallet } from "../../images/wallet.svg";
import { ReactComponent as Pending } from "../../images/pending.svg";
import { ReactComponent as History } from "../../images/history.svg";
import { ReactComponent as Book } from "../../images/book.svg";
import { ReactComponent as Settings } from "../../images/settings.svg";
import { ReactComponent as Support } from "../../images/support.svg";
import { ReactComponent as Signout } from "../../images/signout.svg";

export const SiderbarData = [
	{
		title: "Dashboard",
		path: "/dashboard",
		icon: <Chart />,
	},
	{
		title: "New Dispatch",
		path: "/dashboard/new-dispatch",
		icon: <Shipping />,
	},
	{
		title: "Pending Orders",
		path: "/dashboard/pending-orders",
		icon: <Pending />,
	},
	{
		title: "Order History",
		path: "/dashboard/order-history",
		icon: <History />,
	},
	{
		title: "Fund Wallet",
		path: "/dashboard/fund-wallet",
		icon: <Wallet />,
	},
	{
		title: "About GreensEx",
		path: "/dashboard/about",
		icon: <Book />,
	},
	{
		title: "Support",
		path: "/dashboard/support",
		icon: <Support />,
	},
	{
		title: "Settings",
		path: "/dashboard/settings",
		icon: <Settings />,
	},
	{
		title: "Logout",
		path: "/",
		icon: <Signout />,
		onclick: "signOut",
	},
];

export const AdminRoute = [
	{
		title: "Dashboard",
		path: "/dashboard/admin",
		icon: <Chart />,
	},
	{
		title: "Orders",
		path: "/dashboard/admin/all-order",
		icon: <Shipping />,
	},

	{
		title: "Settings",
		path: "/dashboard/settings",
		icon: <Settings />,
	},
	{
		title: "Logout",
		path: "/",
		icon: <Signout />,
		onclick: "signOut",
	},
];

export const pathTitle = {
	"/dashboard": "Welcome",
	"/dashboard/new-dispatch": "New Dispatch",
	"/dashboard/pending-orders": "Pending Orders",
	"/dashboard/order-history": "Order History",
	"/dashboard/about": "About",
	"/dashboard/support": "Support",
	"/dashboard/settings": "Settings",
	"/dashboard/fund-wallet": "Fund Wallet",
	"/dashboard/admin": "Welcome",
	"/dashboard/admin/all-order": "Orders",
};

export const pathTitleIcon = {
	"/dashboard": <Chart />,
	"/dashboard/new-dispatch": <Shipping />,
	"/dashboard/pending-orders": <Pending />,
	"/dashboard/order-history": <History />,
	"/dashboard/about": <Book />,
	"/dashboard/support": <Support />,
	"/dashboard/settings": <Settings />,
	"/dashboard/fund-wallet": <Wallet />,
	"/dashboard/admin": <Chart />,
	"/dashboard/admin/all-order": <Shipping />,
};

export function LogoDark() {
	return (
		<div className="logooutter">
			<h1>
				Green<span>S</span>Ex
			</h1>
			<p>Logistics</p>
		</div>
	);
}

export function Logo() {
	return (
		<div className="dashboard-logo">
			<h1>
				Green<span>S</span>Ex
			</h1>
			<p>Logistics</p>
		</div>
	);
}

// export function Table({tableTile, children, filter, loading, loadMore}){
//   return(
//     <div className="table">
//       <div className="table-header-section">
//           <p className="text text-title ">{tableTile}</p>
//           <div className="filter-section">
//               {filter}
//           </div>
//       </div>
//       <div className="table-row table-header">
//           <div className="table-cell" style={{"width": "35%"}}>
//               <p className="text text-regular ">Delivery Details</p>
//           </div>
//           <div className="table-cell" style={{"width": "25%"}}>
//               <p className="text text-regular ">Customer Details</p>
//           </div>
//           <div className="table-cell" style={{"width": "20%"}}>
//               <p className="text text-regular ">Date</p>
//           </div>
//           <div className="table-cell" style={{"width": "20%"}}>
//               <p className="text text-regular ">Status</p>
//           </div>
//       </div>
//       {loading}
//       {children}
//       {loadMore}
//     </div>
//   )
// }
