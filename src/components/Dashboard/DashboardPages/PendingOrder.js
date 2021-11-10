import { useState, useEffect, useMemo } from "react";

import { useAuth } from "../../../context/AuthContext";
import { db } from "../../../Firebase";
import { ReactTable } from "../../Table/Table";
import { format } from "date-fns";
import DetailsModal from "../../DetailsModal/DetailsModal";
import Loading from "../../loading";
import {
	collection,
	query,
	orderBy,
	limit,
	where,
	onSnapshot,
} from "firebase/firestore";

function PendingOrder() {
	const { currentUser } = useAuth();
	const [order, setOrder] = useState([]);
	const [loading, setloading] = useState(true);
	const [modalData, setModalData] = useState(null);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const getPendingOrder = async () => {
			try {
				const ref = collection(db, "users", currentUser?.uid, "orders");
				const q = query(
					ref,
					where("status", "in", ["pending", "rider assigned"]),
					orderBy("time", "desc"),
					limit(50)
				);
				const unsub = onSnapshot(q, (doc) => {
					const orders = [];
					doc.forEach((doc) => {
						orders.push(Object.assign(doc.data(), { id: doc.id }));
					});
					setOrder(
						orders.map((order) => ({
							_id: order.id,
							orderId: order.orderid,
							date: order?.time?.toDate(),
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
		return getPendingOrder();
	}, [currentUser]);

	const columns = useMemo(
		() => [
			{
				Header: "Delivery Details",
				accessor: (row) => `${row.description} ${row.dropoffAddress}`, // accessor is the "key" in the data
				collapse: true,

				Cell: ({ row }) => {
					return (
						<div className="table-cell-content">
							<p className="text text-medium nowrap ">
								{row.original.description}
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
				<p className="text">You have no order history.</p>
			)}
			{!loading && order.length > 0 && (
				<div className="card">
					<div className="cardbody">
						<div className="pending-order-page-header">
							<p className="text text-regular">
								You will be called and a rider will be assigned
								to you, Please if your dispatch was completed
								confirm your dispatch
							</p>
						</div>
						<ReactTable
							columns={columns}
							data={data}
							tableTile="Pending Order(s)"
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
					pending={true}
				/>
			)}
		</div>
	);
}

export default PendingOrder;
