import { useState, useEffect, useMemo } from "react";
import { db } from "../../../Firebase";
import { useAuth } from "../../../context/AuthContext";
import { ReactTable } from "../../Table/Table";
import { format } from "date-fns";
import DetailsModal from "../../DetailsModal/DetailsModal";
import Loading from "../../loading";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

function OrderHistory() {
	const { currentUser } = useAuth();
	const [order, setOrder] = useState([]);
	const [loading, setloading] = useState(true);
	const [modalData, setModalData] = useState(null);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const getOrderHistory = async () => {
			try {
				let data = [];
				const ref = collection(db, "users", currentUser?.uid, "orders");
				const q = query(ref, orderBy("time", "desc"), limit(50));
				const querySnapshot = await getDocs(q);
				querySnapshot.forEach((doc) => {
					data.push({
						_id: data.id,
						orderId: doc.data().orderid,
						date: doc.data().time?.toDate(),
						amount: doc.data().amount,
						item: doc.data().item,
						quantity: doc.data().quantity,
						description: doc.data().description,
						pickupName: doc.data().pickupName,
						pickupNumber: doc.data().pickupNumber,
						PickupAddress: doc.data().PickupAddress,
						dropoffName: doc.data().dropoffName,
						dropoffAddress: doc.data().dropoffAddress,
						dropoffPhone: doc.data().dropoffNumber,
						status: doc.data().status,
					});
				});
				setOrder(data);
				setloading(false);
			} catch (err) {
				setloading(false);
				alert(err);
			}
		};
		return getOrderHistory();
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
		<div>
			{loading && <Loading />}
			{!loading && order.length === 0 && (
				<p className="text">You have no order history.</p>
			)}
			{!loading && order.length > 0 && (
				<div className="card">
					<div className="cardbody">
						<ReactTable
							columns={columns}
							data={data}
							tableTile="Order History"
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

export default OrderHistory;
