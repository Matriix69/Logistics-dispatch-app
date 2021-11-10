import { PaystackButton } from "react-paystack";
import "../../css/NewModal.css";
import { BsCheckCircle } from "react-icons/bs";
import { BsXCircle } from "react-icons/bs";

import { db } from "../../Firebase";
import AltLoading from "../loading/AltLoading";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Modal({ props, isError, handleCloseError }) {
	const config = {
		reference: new Date().getTime(),
		email: "user@example.com",
		amount: props.price * 100,
		publicKey: "pk_test_dcbcd0ec0ab2cb375344bacbd06e30c9bb8f14f5",
	};

	const handlePaystackSuccessAction = async (reference) => {
		props.handleCloseCheckOut();
		props.setIsCalculating(true);
		try {
			const ref = collection(db, "orders");
			await addDoc(ref, {
				orderid: props.orderId,
				...props.orderList,
				amount: props.price,
				time: serverTimestamp(),
				status: "pending",
				transId: reference.transaction,
				paymentType: "Debit Card",
				orderType: "Guest",
			});
			props.setIsCalculating(false);
			props.setCheckoutSuccess(true);
		} catch (err) {
			props.setIsCalculating(false);
			props.setError(true);
			alert(
				"Something went wrong, please try again, if you have issues contact support"
			);
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

	return props.open ? (
		<div
			className={
				"background " + (props.open ? "-opened-modal" : "-closed")
			}
		>
			<div className="Wrapper1">
				<div className="Wrapper">
					<div className="order-comfirmation-header">
						<p className="text text-title">
							Our terms and conditions
						</p>
					</div>
					<div className="terms-and-condition-content">
						<div className="heading">
							<p>Indemnity clause</p>
						</div>
						<ul>
							<li>
								The client shall not transport or disguise for
								delivery through the company any illegal goods
								or substance as prohibibited by the laws
								(constitution) of the Federal Republic of
								Nigeria.
							</li>
							<li>
								The client further agrees that all sealed
								item(s) shall not differ from what is declared
								in the manifest of delivery.
							</li>
						</ul>
						<div className="heading">
							<p>terms and conditions</p>
						</div>
						<ul>
							<li>
								Client pledges to be respectful to our staff.
								Greens365 has zero tolerance to abuse or
								violence towards staff.
							</li>
							<li>
								All Deliveries once picked up that get cancelled
								are non refundable.
							</li>
							<li>
								In cases where customers have paid and changed
								their drop-off location, 20% will be deducted
								from the actual service charge for that order
							</li>
							<li>
								All cancellations must be done via whatsapp or
								phone call.
							</li>
							<li>
								Customers will be given 5 minutes allowance of
								delay upon Greens365 rider arriving at pick up
								point, after which a penalty of N50/Min will
								commence till an item is given to the rider.
							</li>
						</ul>
					</div>
				</div>
				<div className="terms-footer">
					<button
						onClick={props.handleCloseOpen}
						className="btn-primary-modal text"
					>
						Accept & close
					</button>
				</div>
			</div>
		</div>
	) : props.checkOut === true ? (
		<div
			className={
				"background " + (props.checkOut ? "-opened-modal" : "-closed")
			}
		>
			<div className="checkout-wrapper">
				<div className="order-comfirmation-header">
					<p className="text text-medium">Order comfirmation</p>
				</div>
				<div className="checkout-content">
					<div className="modal-item">
						<p className="text text-small ">Distance</p>
						<p className="text text-regular ">{props.distance}km</p>
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
							N{props.deliveryFee.toLocaleString()}
						</p>
					</div>
					<div className="modal-item">
						<p className="text text-small ">VAT:</p>
						<p className="text text-regular ">N{props.vat}(7.5%)</p>
					</div>
					<div className="modal-item total-price">
						<p className="text text-small ">Total Price:</p>
						<p className="text text-medium ">
							N{props.price.toLocaleString()}
						</p>
					</div>
					<div className="info-section">
						<p className="text text-small-order ">
							You will be paying with your debit card
						</p>
						<p className="text text-small ">
							Do you wish to continue?
						</p>
					</div>
					<PaystackButton
						className="btn-primary-order text text-regular"
						{...componentProps}
					/>
					<div className="">
						<button
							onClick={props.handleCloseCheckOut}
							className="btn-inverse-order text-order text-regular"
							type="button"
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	) : props.isError ? (
		<div
			className={
				"modal-background " +
				(props.isError ? "-opened-modal" : "-closed")
			}
		>
			<div className="modal-wrapper">
				<div className="modal-header">
					<p className="text text-medium">An Error Occured</p>
				</div>
				<div className="modal-content">
					<div className="modal-body">
						<BsXCircle
							style={{
								fontSize: "30px",
								color: "rgba(198, 40, 40)",
							}}
						/>
						<p>
							Sorry we currently do not operate outside of Rivers
							State.
						</p>
					</div>
					<div className="modal-footer">
						<button
							onClick={props.handleCloseError}
							className="text text-regular"
						>
							close
						</button>
					</div>
				</div>
			</div>
		</div>
	) : props.isCalculating ? (
		<div>
			<AltLoading data="Processing..." />
		</div>
	) : props.checkoutSuccess ? (
		<div
			className={
				"modal-background " +
				(props.checkoutSuccess ? "-opened-modal" : "-closed")
			}
		>
			<div className="modal-success-wrapper">
				<div className="modal-header">
					<p className="text text-medium">
						Your Order has been placed!
					</p>
				</div>
				<div className="modal-success-content">
					<div className="modal-success-body">
						<BsCheckCircle
							style={{ fontSize: "35px", color: "#66cc66" }}
						/>
						<p>
							A rider will be assigned to you! please wait for Our
							call. contact us if you have any complaint
						</p>
					</div>
					<div className="modal-footer">
						<button
							onClick={props.handleCloseCheckOutSuccess}
							className="btn-close text text-regular"
						>
							close
						</button>
					</div>
				</div>
			</div>
		</div>
	) : null;
}

export default Modal;
