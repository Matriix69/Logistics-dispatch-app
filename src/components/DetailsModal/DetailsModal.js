import { useRef, useState } from "react";
import "../../css/order.css";
import { format } from "date-fns";
import { db } from "../../Firebase";
import { useAuth } from "../../context/AuthContext";
import { BsX } from "react-icons/bs";
import AltLoading from "../loading/AltLoading";
import { doc, updateDoc } from "firebase/firestore";

function DetailsModal({ order, setShowModal, pending }) {
	const modalRef = useRef();
	const [loading, setLoading] = useState(false);

	const closeModal = (e) => {
		if (modalRef.current === e.target) {
			setShowModal(false);
		}
	};

	const { currentUser } = useAuth();

	//pending order comfirm
	const userConfirmPendingOrder = async (orderId) => {
		setLoading(true);
		setLoading(true);
		try {
			const ref = doc(db, "users", currentUser?.uid, "orders", orderId);
			await updateDoc(ref, {
				status: "delivered",
			});
			setLoading(false);
			setShowModal(false);
		} catch (error) {
			alert("Something went wrong, please try againg");
			console.log(error);
			setLoading(false);
		}
	};

	async function BusinessDelivered(uid, orderId) {
		setLoading(true);
		try {
			const ref = doc(db, "users", uid, "orders", orderId);
			await updateDoc(ref, {
				status: "delivered",
			});
			setLoading(false);
			setShowModal(false);
		} catch (error) {
			alert("Something went wrong, please try againg");
			console.log(error);
			setLoading(false);
		}
	}

	async function BussinessRiderAssigned(uid, orderId) {
		setLoading(true);
		try {
			const ref = doc(db, "users", uid, "orders", orderId);
			await updateDoc(ref, {
				status: "rider assigned",
			});
			setLoading(false);
			setShowModal(false);
		} catch (error) {
			alert("Something went wrong, please try againg");
			console.log(error);
			setLoading(false);
		}
	}

	async function guestRiderAsigned(orderId) {
		setLoading(true);
		try {
			const ref = doc(db, "orders", orderId);
			await updateDoc(ref, {
				status: "rider assigned",
			});
			setLoading(false);
			setShowModal(false);
		} catch (error) {
			alert("Something went wrong, please try againg");
			console.log(error);
			setLoading(false);
		}
	}

	async function guestdelivered(orderId) {
		setLoading(true);

		try {
			const ref = doc(db, "orders", orderId);
			await updateDoc(ref, {
				status: "delivered",
			});
			setLoading(false);
			setShowModal(false);
		} catch (error) {
			alert("Something went wrong, please try againg");
			console.log(error);
			setLoading(false);
		}
	}

	return (
		<div
			onClick={closeModal}
			ref={modalRef}
			className={"booking-modal-wrapper"}
		>
			<div className="modal-container">
				<div className="modal-title-section">
					<p className="text text-title">Order Details</p>
					<BsX
						className="close-modal-btn"
						style={{ fontSize: "40px" }}
						onClick={() => setShowModal(false)}
					/>
				</div>
				<div className="body-section">
					<div className="order-field">
						<p className="text text-small ">Order id</p>
						<p className="text text-regular ">00{order?.orderId}</p>
					</div>
					<div className="order-field">
						<p className="text text-small ">Date</p>
						<p className="text text-regular ">
							{format(Number(order?.date), "PPP")}
						</p>
					</div>
					<div className="order-field">
						<p className="text text-small ">Amount</p>
						<p className="text text-regular ">
							N{order?.amount.toLocaleString()}
						</p>
					</div>
					<div className="order-field">
						<p className="text text-small ">Item</p>
						<p className="text text-regular ">{order?.item}</p>
					</div>
					<div className="order-field">
						<p className="text text-small ">Description</p>
						<p className="text text-regular ">
							{order?.description}
						</p>
					</div>
					<div className="order-field">
						<p className="text text-small ">Quantity</p>
						<p className="text text-regular ">{order?.quantity}</p>
					</div>
					<div className="order-field">
						<p className="text text-small ">Name</p>
						<p className="text text-regular ">
							{order?.pickupName}
						</p>
					</div>
					<div className="order-field">
						<p className="text text-small ">Phone No</p>
						<p className="text text-regular ">
							{order?.pickupNumber}
						</p>
					</div>
					<div className="order-field">
						<p className="text text-small ">Address</p>
						<p className="text text-regular ">
							{order?.PickupAddress}
						</p>
					</div>
					<div className="order-field">
						<p className="text text-small ">Receiver Name</p>
						<p className="text text-regular ">
							{order?.dropoffName}
						</p>
					</div>
					<div className="order-field">
						<p className="text text-small ">Receiver No</p>
						<p className="text text-regular ">
							{order?.dropoffPhone}
						</p>
					</div>
					<div className="order-field">
						<p className="text text-small ">Receiver-Address</p>
						<p className="text text-regular ">
							{order?.dropoffAddress}
						</p>
					</div>
					{currentUser.admin && (
						<div
							style={{
								background: "#f2f2f2",
								padding: "10px",
								borderRadius: "10px",
							}}
						>
							<div className="order-field">
								<p className="text text-small ">Payment Type</p>
								<p className="text text-regular ">
									{order?.paymentType}
								</p>
							</div>
							<div className="order-field">
								<p className="text text-small ">Order Type</p>
								<p className="text text-regular ">
									{order?.orderType}
								</p>
							</div>
						</div>
					)}
				</div>
				{pending && (
					<div className="order-list-bottom">
						<button
							onClick={() => userConfirmPendingOrder(order._id)}
							className=" text text-regular btn-primary confirm-dispatch"
						>
							Confirm dispatch
						</button>
					</div>
				)}

				{/* admin  actions */}
				{currentUser.admin && (
					<div className="order-list-bottom">
						{/* bussine botton */}
						{order.status === "pending" &&
							order.orderType === "bussiness" && (
								<button
									onClick={() =>
										BussinessRiderAssigned(
											order?.user,
											order._id
										)
									}
									className=" text text-regular btn-primary rider-assigned margin-right"
								>
									Assign
								</button>
							)}
						{order.status !== "delivered" &&
							order.orderType === "bussiness" && (
								<button
									onClick={() =>
										BusinessDelivered(
											order?.user,
											order._id
										)
									}
									className=" text text-regular confirm-dispatch btn-primary"
								>
									Confirm
								</button>
							)}

						{/* guest botton */}
						{order.status === "pending" &&
							order.orderType === "Guest" && (
								<button
									onClick={() => guestRiderAsigned(order._id)}
									className=" text text-regular btn-primary rider-assigned margin-right"
								>
									Assign
								</button>
							)}
						{order.status !== "delivered" &&
							order.orderType === "Guest" && (
								<button
									onClick={() => guestdelivered(order._id)}
									className=" text text-regular confirm-dispatch btn-primary"
								>
									Confirm
								</button>
							)}
					</div>
				)}
			</div>
			{loading && <AltLoading />}
		</div>
	);
}

export default DetailsModal;
