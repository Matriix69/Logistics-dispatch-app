import { useState, useEffect, useMemo } from "react";
import "../../../css/FundWallet.css";
import { PaystackButton } from "react-paystack";
import { useAuth } from "../../../context/AuthContext";
import { db } from "../../../Firebase";
import { ReactTable } from "../../Table/Table";
import { format } from "date-fns";
import {
	doc,
	collection,
	getDocs,
	query,
	orderBy,
	limit,
	updateDoc,
	setDoc,
	serverTimestamp,
} from "firebase/firestore";

function FundWallet() {
	const [amount, setAmount] = useState("");
	const [laoding, setLoading] = useState(false);
	const {
		currentUser,
		wallet,
		walletHistory,
		setWalletHistory,
		getWalletBalance,
	} = useAuth();

	useEffect(() => {
		const getWalletHistory = async () => {
			setLoading(true);
			try {
				let data = [];
				const ref = collection(db, "users", currentUser?.uid, "wallet");
				const q = query(ref, orderBy("time", "desc"), limit(30));
				const querySnapshot = await getDocs(q);
				querySnapshot.forEach((doc) => {
					data.push({
						_id: doc.id,
						status: doc.data().status,
						time: doc.data().time.toDate(),
						amount: doc.data().amount,
						transId: doc.data().transId,
					});
				});
				setWalletHistory([...data]);
				setLoading(false);
			} catch (error) {
				alert("Couldn't load wallet history");
				setLoading(false);
			}
		};
		return getWalletHistory();
	}, [currentUser, setWalletHistory]);

	//paystack
	const config = {
		reference: new Date().getTime(),
		email: currentUser.email,
		amount: amount * 100,
		publicKey: "pk_test_dcbcd0ec0ab2cb375344bacbd06e30c9bb8f14f5",
	};
	const handlePaystackSuccessAction = async (reference) => {
		try {
			const balanceRaf = doc(
				db,
				"users",
				currentUser?.uid,
				"wallet",
				"balaance"
			);
			const walletHistoryRaf = doc(
				db,
				"users",
				currentUser?.uid,
				"wallet",
				reference.transaction
			);

			await Promise.all([
				await updateDoc(balanceRaf, {
					amount: Number(wallet.data.amount) + Number(amount),
				}),
				await setDoc(walletHistoryRaf, {
					amount: Number(amount),
					time: serverTimestamp(),
					status: "Fund",
					transId: reference.transaction,
				}),
			]);

			getWalletBalance();
		} catch (error) {
			console.log(error);
			alert(error);
		}
	};

	const handlePaystackCloseAction = () => {
		// console.log('closed')
	};
	const componentProps = {
		...config,
		text: "Continue",
		onSuccess: (reference) => handlePaystackSuccessAction(reference),
		onClose: handlePaystackCloseAction,
	};

	//input validating
	function handleOnAmountChange(e) {
		const regex = /^[0-9\b]+$/;
		if (e.target.value === "" || regex.test(e.target.value)) {
			setAmount(e.target.value);
		}
	}
	const columns = useMemo(
		() => [
			{
				Header: "Amount",
				accessor: (row) => `${row.amount} ${row.time}`, // accessor is the "key" in the data
				// collapse: true,

				Cell: ({ row }) => {
					return (
						<div className="table-cell-content">
							<p className="text text-regular nowrap ">
								NGN {row.original.amount.toLocaleString()}
							</p>
							<p className="text text-small nowrap ">
								{format(Number(row.original.time), "PPP")}
							</p>
						</div>
					);
				},
			},
			{
				Header: "Status",
				accessor: (row) => `${row.status}`,
				Cell: ({ row }) => {
					return (
						<div className="walletHistory-child">
							<p
								className={
									"text " +
									(row.original?.status === "Fund"
										? "wallet-amount"
										: "wallet-amount-dispatch")
								}
							>
								{row.original?.status === "Fund"
									? "Credit"
									: "Debit"}
							</p>
						</div>
					);
				},
				// collapse: true,
			},
		],
		[]
	);

	const data = useMemo(() => walletHistory, [walletHistory]);

	return (
		<div className="card">
			<div className="cardbody">
				<div className="fund-wallet-page">
					<div className="section1">
						<div className="credit-card credit-card">
							<p className="text text-small ">Current Balance:</p>
							<p className="text text-large ">
								N{wallet.data?.amount.toLocaleString()}
							</p>
							<p className="text text-regular card-number">
								**** **** **** 0365
							</p>
							<div className="card-icon icon"></div>
							<div className="card-footer">
								<p className="text text-regular ">
									Express Card
								</p>
								<p className="text text-regular ">**/**</p>
							</div>
						</div>

						<div className="input-section">
							<label className="text text-small">Amount </label>
							<input
								name="amount"
								type="text"
								className="input "
								value={amount}
								onChange={handleOnAmountChange}
								onFocus={handleOnAmountChange}
							/>

							<div className="proceed-button">
								{amount === "" ? (
									<button className="btn-primary-order text text-regular">
										Continue
									</button>
								) : (
									<PaystackButton
										className="btn-primary-order text text-regular"
										{...componentProps}
									/>
								)}
							</div>
						</div>
					</div>

					<div className="section1">
						{laoding && (
							<div className="loader">
								<div className="spinner"></div>
							</div>
						)}
						{!laoding && walletHistory.length > 0 && (
							<ReactTable
								columns={columns}
								data={data}
								tableTile="Wallet History"
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
export default FundWallet;
