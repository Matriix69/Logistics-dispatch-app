import "../../../css/order.css";
import { format } from "date-fns";

function FundWalletHistory({ walletHistory }) {
	return (
		<div className="wallet-list-wrapper">
			<div className="walletHistory">
				<div className="walletHistory-child">
					<p className="text text-regular">
						{walletHistory.data.status}
					</p>
					<p className="text text-small walletdate">
						{format(Number(walletHistory.data.time), "PPPpp")}
					</p>
				</div>
				<div className="walletHistory-child">
					<p
						className={
							"text text-regular " +
							(walletHistory.data.status === "Fund"
								? "wallet-amount"
								: "wallet-amount-dispatch")
						}
					>
						{walletHistory.data.status === "Fund" ? "+" : "-"}
						{walletHistory.data.amount.toLocaleString()}
					</p>
				</div>
			</div>
		</div>
	);
}

export default FundWalletHistory;
