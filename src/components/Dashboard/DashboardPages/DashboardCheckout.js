import { PaystackButton } from "react-paystack";
import "../../../css/NewModal.css";
import { useAuth } from "../../../context/AuthContext";
import { db } from "../../../Firebase";
import { useHistory } from "react-router-dom";
import {
	doc,
	collection,
	updateDoc,
	addDoc,
	serverTimestamp,
} from "firebase/firestore";

function Modal({
	orderList,
	orderId,
	setIsCalculating,
	deliveryFee,
	vat,
	price,
	distance,
	checkOut,
	handleCloseCheckOut,
}) {
	const { currentUser, wallet, getWalletBalance } = useAuth();
	const history = useHistory();

	const config = {
		reference: new Date().getTime(),
		email: currentUser.email,
		amount: price * 100,
		publicKey: "pk_test_dcbcd0ec0ab2cb375344bacbd06e30c9bb8f14f5",
	};
	const handlePaystackSuccessAction = async (reference) => {
		setIsCalculating(true);

		try {
			const newOrderRaf = collection(
				db,
				"users",
				currentUser?.uid,
				"orders"
			);
			await addDoc(newOrderRaf, {
				orderid: orderId,
				user: currentUser.uid,
				...orderList,
				amount: price,
				time: serverTimestamp(),
				status: "pending",
				transId: reference.transaction,
				paymentType: "Debit Card",
				orderType: "bussiness",
			});
			getWalletBalance();
			history.push("/dashboard/pending-orders");
		} catch (error) {
			console.log(error);
			setIsCalculating(false);
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

	const payWithWallet = async () => {
		setIsCalculating(true);

		try {
			const walletBalanceRaf = doc(
				db,
				"users",
				currentUser?.uid,
				"wallet",
				"balaance"
			);
			const walletHistoryRaf = collection(
				db,
				"users",
				currentUser?.uid,
				"wallet"
			);
			const newOrderWithWalletRaf = collection(
				db,
				"users",
				currentUser?.uid,
				"orders"
			);

			await Promise.all([
				updateDoc(walletBalanceRaf, {
					amount: Number(wallet.data.amount) - Number(price),
				}),
				addDoc(walletHistoryRaf, {
					amount: price,
					time: serverTimestamp(),
					status: "Dispatch request",
					transId: orderId,
				}),
				addDoc(newOrderWithWalletRaf, {
					orderid: orderId,
					user: currentUser.uid,
					...orderList,
					amount: price,
					time: serverTimestamp(),
					status: "pending",
					transId: orderId,
					paymentType: "Debit Card",
					orderType: "bussiness",
				}),
			]);

			await getWalletBalance();
			await setIsCalculating(false);
			history.push("/dashboard/pending-orders");
		} catch (error) {
			console.log(error);
			alert(error);
			setIsCalculating(false);
		}
	};

	return checkOut ? (
		<div
			className={"background " + (checkOut ? "-opened-modal" : "-closed")}
		>
			<div className="checkout-wrapper">
				<div className="order-comfirmation-header">
					<p className="text text-regular">Order comfirmation</p>
				</div>
				<div className="checkout-content">
					<div className="modal-item">
						<p className="text text-small ">Distance</p>
						<p className="text text-regular ">{distance}km</p>
					</div>
					<div className="modal-item">
						<p className="text text-small ">Rate:</p>
						<p className="text text-regular ">N60/km</p>
					</div>
					<div className="modal-item">
						<p className="text text-small ">Base Fare:</p>
						<p className="text text-regular ">N600.00</p>
					</div>
					<div className="modal-item">
						<p className="text text-small ">Delivery Fee:</p>
						<p className="text text-regular ">
							N{deliveryFee.toLocaleString()}
						</p>
					</div>
					<div className="modal-item">
						<p className="text text-small ">VAT:</p>
						<p className="text text-regular ">N{vat}(7.5%)</p>
					</div>
					<div className="modal-item total-price">
						<p className="text text-small ">Total Price:</p>
						<p className="text text-medium ">
							N{price.toLocaleString()}
						</p>
					</div>
					<div className="info-section">
						<p className="text text-small-order ">
							You will be paying with your debit card
						</p>
						<p className="text text-small">
							Do you wish to continue?
						</p>
					</div>
					<PaystackButton
						className="btn-primary-order text text-regular"
						{...componentProps}
					/>
					{wallet.data.amount >= price ? (
						<button
							className="btn-primary-order text text-regular"
							onClick={payWithWallet}
						>
							Pay with Wallet
						</button>
					) : null}
					<div className="">
						<button
							onClick={handleCloseCheckOut}
							className="btn-inverse-order text-order text-regular"
							type="button"
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	) : null;
}

export default Modal;
