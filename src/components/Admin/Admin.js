import { useState, useEffect, useMemo } from "react";
import { db } from "../../Firebase";
import "../../css/Admin.css";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import { ReactTable } from "../Table/Table";
import { format } from "date-fns";
import DetailsModal from "../DetailsModal/DetailsModal";
import Loading from "../loading";
import {
	collectionGroup,
	query,
	orderBy,
	limit,
	onSnapshot,
} from "firebase/firestore";

export default function Admin() {
	const [order, setOrder] = useState([]);
	const [loading, setloading] = useState(true);
	// const [value, setValue] = useState('all')
	const [modalData, setModalData] = useState(null);
	const [showModal, setShowModal] = useState(false);

	const history = useHistory();
	const { currentUser } = useAuth();

	useEffect(() => {
		if (currentUser?.admin === true) {
		} else {
			history.push("");
		}
	}, [currentUser, history]);

	useEffect(() => {
		// getOrders();
		const getAllOrders = async () => {
			try {
				const ref = collectionGroup(db, "orders");
				const q = query(ref, orderBy("time", "desc"), limit(100));
				const unsub = onSnapshot(q, (doc) => {
					const orders = [];
					doc.forEach((doc) => {
						orders.push(Object.assign(doc.data(), { id: doc.id }));
					});
					setOrder(
						orders.map((order) => ({
							_id: order.id,
							orderId: order.orderid,
							date: order.time?.toDate(),
							item: order.item,
							amount: order.amount,
							quantity: order.quantity,
							description: order.description,
							pickupName: order.pickupName,
							pickupNumber: order.pickupNumber,
							PickupAddress: order.PickupAddress,
							dropoffName: order.dropoffName,
							dropoffAddress: order.dropoffAddress,
							dropoffPhone: order.dropoffNumber,
							status: order.status,
							paymentType: order.paymentType,
							orderType: order.orderType,
						}))
					);
					setloading(false);
				});
				return unsub;
			} catch (err) {
				setloading(false);
				alert(err);
			}
		};
		return getAllOrders();
	}, []);

	const columns = useMemo(
		() => [
			{
				Header: "Delivery Details",
				accessor: (row) => `${row.orderId} ${row.dropoffAddress}`, // accessor is the "key" in the data
				collapse: true,

				Cell: ({ row }) => {
					return (
						<div className="table-cell-content">
							<p className="text text-medium nowrap ">
								ID: {row.original.orderId}
							</p>
							<p className="text text-small nowrap ">
								{row.original.dropoffAddress}
							</p>
						</div>
					);
				},
			},
			{
				Header: "Customer Details",
				accessor: (row) => `${row.pickupName} ${row.PickupAddress}`,
				Cell: ({ row }) => {
					return (
						<div className="table-cell-content">
							<p className="text text-medium nowrap ">
								{row.original.pickupName}
							</p>
							<p className="text text-small nowrap ">
								{row.original.PickupAddress}
							</p>
						</div>
					);
				},
				collapse: true,
			},
			{
				Header: "Date",
				accessor: (row) =>
					`${format(Number(row.date), "PPP")} ${format(
						Number(row.date),
						"p"
					)}`,
				Cell: ({ row }) => {
					return (
						<div className="table-cell-content">
							<p className="text text-medium nowrap ">
								{format(Number(row.original.date), "PPP")}
							</p>
							<p className="text text-small nowrap ">
								{format(Number(row.original.date), "p")}
							</p>
						</div>
					);
				},
				collapse: true,
				show: true,
			},
			{
				Header: "status",
				accessor: (row) => `${row.status}`,
				Cell: ({ row }) => {
					return (
						<div
							className={
								"status text " +
								(row.original.status === "delivered"
									? "green"
									: row.original.status === "pending"
									? "redcoloer"
									: "pending-status")
							}
						>
							{row.original.status}
						</div>
					);
				},
				collapse: true,
			},
		],
		[]
	);

	const data = useMemo(() => order, [order]);

	return (
		<div className="">
			{loading && <Loading />}
			{!loading && order.length === 0 && (
				<p className="text">no order history.</p>
			)}
			{!loading && order.length > 0 && (
				<div className="card">
					<div className="cardbody">
						<ReactTable
							columns={columns}
							data={data}
							tableTile="Orders"
							setRowData={setModalData}
							showDataModal={setShowModal}
						/>
					</div>
				</div>
			)}
			{showModal && (
				<DetailsModal
					order={modalData.original}
					setShowModal={setShowModal}
				/>
			)}
		</div>
	);
}
