import { useState, useEffect } from "react";
import "../../css/Deliveries.css";
import { useHistory } from "react-router-dom";
import { Formik, Field } from "formik";
import * as yup from "yup";
import PlacesAutocomplete from "react-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import NewModal from "./NewModal";
import Modal from "../Modal/Modal";
import { BiChevronLeft } from "react-icons/bi";
import { useAuth } from "../../context/AuthContext";
import classnames from "classnames";
import { storeAddressComponents } from "../../utils/utils";

function Deliveries() {
	let history = useHistory();
	const { currentUser } = useAuth();

	const [checkOut, setCheckOut] = useState(false);
	const [checkoutSuccess, setCheckoutSuccess] = useState(false);
	const [open, setOpen] = useState(false);
	const [isError, setIsError] = useState(false);
	const [orderVariables, setOrderVariable] = useState(null);
	const [isCalculating, setIsCalculating] = useState(false);
	const [pageLoaded, setPageLoaded] = useState(false);

	const [address, setAddress] = useState("");
	const [address2, setAddress2] = useState("");

	const [addDetails, setAddDetails] = useState(null);
	const [add2Details, setAdd2Details] = useState(null);

	const [orderList, setOrderList] = useState(null);
	const [error, setError] = useState(false);

	const handleSelect = async (value) => {
		const results = await geocodeByAddress(value);
		const latLng = await getLatLng(results[0]);
		const details = storeAddressComponents(results, latLng);

		setAddress(value);
		setAddDetails(details);
	};
	const handleSelect2 = async (value) => {
		const results = await geocodeByAddress(value);
		const latLng = await getLatLng(results[0]);
		const details = storeAddressComponents(results, latLng);

		setAddress2(value);
		setAdd2Details(details);
	};

	const handleCloseOpen = () => {
		window.sessionStorage.setItem("tandcaccepted", "yes");
		setOpen(false);
	};

	const handleCloseCheckOut = () => {
		setCheckOut(false);
	};
	const handleCloseError = () => {
		setIsError(false);
		setError(false);
	};

	const handleCloseCheckOutSuccess = () => {
		setCheckoutSuccess(false);
	};

	const validationSchema = yup.object().shape({
		item: yup.string().required("Required"),
		quantity: yup
			.number()
			.typeError("numbers only")
			.required()
			.positive()
			.integer(),
		description: yup.string().required("Required"),
		pickupName: yup.string().required("Required"),
		pickupNumber: yup
			.number("Your mobile number is required")
			.required("Required"),
		dropoffName: yup.string().required("Required"),
		dropoffNumber: yup
			.number("Your mobile number is required")
			.required("Required"),
	});

	useEffect(() => {
		let timeOut2 = setTimeout(() => {
			setPageLoaded(true);
		}, 50);

		let timer2 = setTimeout(() => {
			const alreadyAccepted =
				window.sessionStorage.getItem("tandcaccepted");
			if (!alreadyAccepted) setOpen(true);
		}, 2000);

		return () => {
			clearTimeout(timer2);
			clearTimeout(timeOut2);
		};
	}, []);

	const calculate = async () => {
		let pickupAddress = addDetails?.state.toLowerCase();
		let dropoffAdress = add2Details?.state.toLowerCase();

		if (pickupAddress !== "rivers" || dropoffAdress !== "rivers") {
			setIsError(true);
			return;
		}

		setIsCalculating(true);

		try {
			const res = await Promise.all([
				fetch(
					"https://europe-west1-logistics-77d43.cloudfunctions.net/api/distance",
					{
						method: "post",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							from: addDetails?.coordinates,
							to: add2Details?.coordinates,
						}),
					}
				),
				fetch(
					"https://europe-west1-logistics-77d43.cloudfunctions.net/api/orderId",
					{
						method: "post",
						headers: { "Content-Type": "application/json" },
					}
				),
			]);
			const data = await Promise.all(res.map((res) => res.json()));

			if (data[0].error === "something went wrong") {
				setError(true);
				return;
			}
			const getOrderVariables = Object.assign(data[0], data[1]);
			setOrderVariable(getOrderVariables);
			setIsCalculating(false);
			setCheckOut(true);
		} catch (error) {
			setIsCalculating(false);
			alert("Something went wrong, please try agains");
		}
	};

	const props = {
		open: open,
		checkOut: checkOut,
		handleCloseOpen: handleCloseOpen,
		handleCloseCheckOut: handleCloseCheckOut,
		isError: isError,
		handleCloseError: handleCloseError,

		vat: orderVariables?.vat,
		distance: orderVariables?.distance,
		price: orderVariables?.totalPrice,
		deliveryFee: orderVariables?.price,
		isCalculating: isCalculating,
		orderId: orderVariables?.orderId,

		orderList: orderList,

		setCheckoutSuccess: setCheckoutSuccess,
		handleCloseCheckOutSuccess: handleCloseCheckOutSuccess,
		checkoutSuccess: checkoutSuccess,
		setIsCalculating: setIsCalculating,
		setError: setError,
	};

	return (
		<div>
			<div
				className={classnames({
					"Deliveries-wrapper ": true,
					"show-page": pageLoaded,
				})}
			>
				<div className="back-button" onClick={() => history.push("/")}>
					<BiChevronLeft style={{ fontSize: "30px" }} />
				</div>
				<p className="text text-title">Request Dispatch</p>
				<p className="text text-regular header-subtitle">
					Request a dispatch to pick and deliver your parcel in no
					time.
				</p>

				<Formik
					initialValues={{
						item: "",
						quantity: "",
						description: "",
						pickupName: "",
						pickupNumber: "",
						PickupAddress: "",
						pickupLandmark: "",
						dropoffName: "",
						dropoffAddress: "",
						dropoffNumber: "",
						dropoffLandmark: "",
					}}
					validationSchema={validationSchema}
					onSubmit={(values, { setSubmitting, resetForm }) => {
						setSubmitting(true);
						let dispatchPickUp = address;
						let dispatchDropOff = address2;
						setOrderList({
							...values,
							PickupAddress: dispatchPickUp,
							dropoffAddress: dispatchDropOff,
						});
						calculate();
					}}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting,
						setFieldValue,
					}) => (
						<form onSubmit={handleSubmit}>
							<div className="new-dispatch">
								<div className="grid-sections">
									<div className="section-one">
										<div className="input-section ">
											<p
												className={
													errors.item && touched.item
														? "text text-small errmsg"
														: "text text-small"
												}
											>
												Item{" "}
											</p>
											<input
												className={
													errors.item && touched.item
														? "input error"
														: "input"
												}
												type="Text"
												name="item"
												id="item"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.item}
											/>
											{errors.item && touched.item ? (
												<div className="errorMessage">
													{errors.item}
												</div>
											) : null}
										</div>
										<div className="input-section ">
											<p
												className={
													errors.quantity &&
													touched.quantity
														? "text text-small errmsg"
														: "text text-small"
												}
											>
												Quantity{" "}
											</p>
											<input
												className={
													errors.quantity &&
													touched.quantity
														? "input error"
														: "input"
												}
												type="Text"
												name="quantity"
												id="quantity"
												onBlur={handleBlur}
												value={values.quantity}
												onChange={(e) => {
													e.preventDefault();
													const { value } = e.target;
													const regex = /^[0-9\b]+$/;
													if (
														value === "" ||
														regex.test(value)
													) {
														setFieldValue(
															"quantity",
															value
														);
													}
												}}
											/>
											{errors.quantity &&
											touched.quantity ? (
												<div className="errorMessage">
													{errors.quantity}
												</div>
											) : null}
										</div>
									</div>

									<div className="section-one ">
										<div className="input-section">
											<p
												className={
													errors.description &&
													touched.description
														? "text text-small errmsg"
														: "text text-small"
												}
											>
												Description{" "}
											</p>
											<textarea
												className={
													errors.description &&
													touched.description
														? "input error"
														: "input"
												}
												name="description"
												id="subject"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.description}
											></textarea>
											{errors.description &&
											touched.description ? (
												<div className="errorMessage">
													{errors.description}
												</div>
											) : null}
										</div>
									</div>
								</div>

								<div className="grid-sections">
									<div className="delivery-info">
										<p className="text text-title ">
											PICK UP
										</p>
										<div className="input-section">
											<p
												className={
													errors.pickupName &&
													touched.pickupName
														? "text text-small errmsg"
														: "text text-small"
												}
											>
												Name{" "}
											</p>
											<input
												name="pickupName"
												type="text"
												className={
													errors.pickupName &&
													touched.pickupName
														? "input error"
														: "input"
												}
												maxLength="30"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.pickupName}
											/>
											{errors.pickupName &&
											touched.pickupName ? (
												<div className="errorMessage">
													{errors.pickupName}
												</div>
											) : null}

											{currentUser ? (
												<div className="checkbox-use-details">
													<Field
														type="checkbox"
														name="acceptTerms"
														onChange={(e) => {
															handleChange(e);
															if (
																e.target.checked
															) {
																setFieldValue(
																	"pickupName",
																	currentUser?.displayName
																);
																setFieldValue(
																	"pickupNumber",
																	currentUser?.photoURL
																);
															} else {
																setFieldValue(
																	"pickupName",
																	""
																);
																setFieldValue(
																	"pickupNumber",
																	""
																);
															}
														}}
													/>
													<label className="text-small">
														Use my details
													</label>
												</div>
											) : null}
										</div>
										<div className="input-section">
											<p
												className={
													errors.pickupNumber &&
													touched.pickupNumber
														? "text text-small errmsg"
														: "text text-small"
												}
											>
												Phone Number{" "}
											</p>
											<div>
												{/* <label htmlFor="number">+234 </label> */}
												<input
													style={{ width: "100%" }}
													name="pickupNumber"
													type="text"
													className={
														errors.pickupNumber &&
														touched.pickupNumber
															? "input has-prepend error"
															: "input has-prepend"
													}
													maxLength="12"
													onBlur={handleBlur}
													value={values.pickupNumber}
													onChange={(e) => {
														e.preventDefault();
														const { value } =
															e.target;
														const regex =
															/^[0-9\b]+$/;
														if (
															value === "" ||
															regex.test(value)
														) {
															setFieldValue(
																"pickupNumber",
																value
															);
														}
													}}
												/>
												<p className="text text-medium prepend-delivery">
													+234 -{" "}
												</p>
												{errors.pickupNumber &&
												touched.pickupNumber ? (
													<div className="errorMessage">
														{errors.pickupNumber}
													</div>
												) : null}
											</div>
										</div>

										<div className="input-section-delivery">
											<PlacesAutocomplete
												value={address}
												onChange={setAddress}
												onSelect={handleSelect}
											>
												{({
													getInputProps,
													suggestions,
													getSuggestionItemProps,
													loading,
												}) => (
													<div className="input-section delivery-input">
														<p className="text text-small ">
															Address
														</p>

														<input
															{...getInputProps({
																placeholder:
																	"search places...",
															})}
															name="pickupAddress"
															id="pickupAddress"
														/>
														{errors.pickupAddress &&
														touched.pickupAddress ? (
															<div className="errorMessage">
																{
																	errors.pickupAddress
																}
															</div>
														) : null}
														<div className="autocomplete-dropdown">
															{loading ? (
																<div className=" address-loading spinner3"></div>
															) : null}
															{suggestions.map(
																(
																	suggestion
																) => {
																	const style =
																		{
																			backgroundColor:
																				suggestion.active
																					? "#66cc66"
																					: "#fff",
																			cursor: suggestion.active
																				? "pointer"
																				: "pointer",
																			padding:
																				suggestion.active
																					? "15px"
																					: "15px",
																			border: suggestion.active
																				? "1px solid #dfe0eb"
																				: "1px solid #dfe0eb",
																			textAlign:
																				suggestion.active
																					? "center"
																					: "center",
																			fontSize:
																				suggestion.active
																					? "10px"
																					: "10px",
																		};
																	return (
																		<div
																			key={Math.random()}
																			{...getSuggestionItemProps(
																				suggestion,
																				{
																					style,
																				}
																			)}
																		>
																			{
																				suggestion.description
																			}
																		</div>
																	);
																}
															)}
														</div>
													</div>
												)}
											</PlacesAutocomplete>
										</div>

										<div className="input-section">
											<p className="text text-small ">
												Pickup Landmark{" "}
											</p>
											<input
												name="pickupLandmark"
												type="text"
												className="input "
												maxLength="100"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.pickupLandmark}
											/>
										</div>
									</div>

									<div className="delivery-info">
										<p className="text text-title ">
											DROP OFF
										</p>
										<div className="input-section">
											<p
												className={
													errors.dropoffName &&
													touched.dropoffName
														? "text text-small errmsg"
														: "text text-small"
												}
											>
												Name{" "}
											</p>
											<input
												name="dropoffName"
												type="text"
												className={
													errors.dropoffName &&
													touched.dropoffName
														? "input error"
														: "input"
												}
												maxLength="30"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.dropoffName}
											/>
											{errors.dropoffName &&
											touched.dropoffName ? (
												<div className="errorMessage">
													{errors.dropoffName}
												</div>
											) : null}
										</div>
										<div className="input-section ">
											<p
												className={
													errors.dropoffNumber &&
													touched.dropoffNumber
														? "text text-small errmsg"
														: "text text-small"
												}
											>
												Phone Number{" "}
											</p>
											<div>
												{/* <label htmlFor="number">+234 </label> */}
												<input
													style={{ width: "100%" }}
													name="dropoffNumber"
													type="text"
													className={
														errors.dropoffNumber &&
														touched.dropoffNumber
															? "input has-prepend error"
															: "input has-prepend"
													}
													maxLength="16"
													onBlur={handleBlur}
													value={values.dropoffNumber}
													onChange={(e) => {
														e.preventDefault();
														const { value } =
															e.target;
														const regex =
															/^[0-9\b]+$/;
														if (
															value === "" ||
															regex.test(value)
														) {
															setFieldValue(
																"dropoffNumber",
																value
															);
														}
													}}
												/>
												<p className="text text-medium prepend-delivery">
													+234 -{" "}
												</p>
												{errors.dropoffNumber &&
												touched.dropoffNumber ? (
													<div className="errorMessage">
														{errors.dropoffNumber}
													</div>
												) : null}
											</div>
										</div>

										<div className="input-section-delivery">
											<PlacesAutocomplete
												value={address2}
												onChange={setAddress2}
												onSelect={handleSelect2}
											>
												{({
													getInputProps,
													suggestions,
													getSuggestionItemProps,
													loading,
												}) => (
													<div className="delivery-input input-section">
														<p className="text text-small ">
															Address
														</p>

														<input
															{...getInputProps({
																placeholder:
																	"search places...",
															})}
															// style={{width: '100%'}}
															// className="input"
															type="Text"
															name="dropoffAddress"
															id="dropoffAddress"
														/>
														{errors.dropoffAddress &&
														touched.dropoffAddress ? (
															<div className="errorMessage">
																{
																	errors.dropoffAddress
																}
															</div>
														) : null}
														<div className="autocomplete-dropdown">
															{loading ? (
																<div className=" address-loading spinner3"></div>
															) : null}
															{suggestions.map(
																(
																	suggestion
																) => {
																	const style =
																		{
																			backgroundColor:
																				suggestion.active
																					? "#66cc66"
																					: "#fff",
																			cursor: suggestion.active
																				? "pointer"
																				: "pointer",
																			padding:
																				suggestion.active
																					? "15px"
																					: "15px",
																			border: suggestion.active
																				? "1px solid #dfe0eb"
																				: "1px solid #dfe0eb",
																			textAlign:
																				suggestion.active
																					? "center"
																					: "center",
																			fontSize:
																				suggestion.active
																					? "10px"
																					: "10px",
																		};
																	return (
																		<div
																			key={Math.random()}
																			{...getSuggestionItemProps(
																				suggestion,
																				{
																					style,
																				}
																			)}
																		>
																			{
																				suggestion.description
																			}
																		</div>
																	);
																}
															)}
														</div>
													</div>
												)}
											</PlacesAutocomplete>
										</div>
										<div className="input-section">
											<p className="text text-small form-input-label">
												Dropoff Landmark{" "}
											</p>
											<input
												name="dropoffLandmark"
												type="text"
												className="input "
												maxLength="100"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.dropoffLandmark}
											/>
										</div>
									</div>
								</div>

								<div className="button-delivery">
									<input
										className="btn-primary-delivery text text-regular"
										type="submit"
										value="Proceed"
									/>
								</div>
							</div>
						</form>
					)}
				</Formik>
			</div>

			<NewModal props={props} />
			<Modal error={error} handleCloseError={handleCloseError} />
		</div>
	);
}

export default Deliveries;
