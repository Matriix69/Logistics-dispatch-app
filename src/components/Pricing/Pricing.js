import { useState, useEffect } from "react";
import "../../css/Pricing.css";
import PlacesAutocomplete from "react-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { RiEBike2Fill } from "react-icons/ri";
import { MdMoreHoriz } from "react-icons/md";
import classnames from "classnames";
import { storeAddressComponents } from "../../utils/utils";

function Pricing() {
	const [address, setAddress] = useState("");
	const [address2, setAddress2] = useState("");

	const [addDetails, setAddDetails] = useState(null);
	const [add2Details, setAdd2Details] = useState(null);
	const [distance, setDistance] = useState(null);
	const [vat, setVat] = useState(null);
	const [price, setPrice] = useState(null);
	const [isCalculating, setIsCalculating] = useState(false);
	const [pageLoaded, setPageLoaded] = useState(false);

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

	const calculate = async () => {
		setIsCalculating(true);
		try {
			const data = await fetch(
				"https://europe-west1-logistics-77d43.cloudfunctions.net/api/distance",
				{
					method: "post",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						from: addDetails?.coordinates,
						to: add2Details?.coordinates,
					}),
				}
			);
			const res = await data.json();
			console.log(res);
			if (res.error === "something went wrong") {
				alert(res.error);
				setIsCalculating(false);
				return;
			}
			setDistance(res.distance);
			setVat(res.vat);
			setPrice(res.totalPrice);
			setIsCalculating(false);
		} catch (error) {
			alert("something went wrong, please try again");
			setIsCalculating(false);
		}
	};

	useEffect(() => {
		let timeOut = setTimeout(() => {
			setPageLoaded(true);
		}, 50);
		return () => {
			clearTimeout(timeOut);
		};
	}, []);

	return (
		<div
			className={classnames({
				"pricing-wrapper ": true,
				"show-page": pageLoaded,
			})}
		>
			<div className="pricing-page-title">Calculate Dispatch Cost</div>
			<div className="order-table">
				<div className="order-title">
					<RiEBike2Fill
						style={{ fontSize: "18px", marginRight: "5px" }}
					/>
					<h3>Bike</h3>
				</div>

				<div className="order-item">
					<span>Distance:</span>
					{distance ? <span>{distance}km</span> : <span>—</span>}
				</div>
				<div className="order-item">
					<span>Rate:</span>
					<span>N60 (per km)</span>
				</div>
				<div className="order-item">
					<span>Base Price:</span>
					<span>N600</span>
				</div>
				<div className="order-item">
					<span>Base Distance:</span>
					<span>10km</span>
				</div>
				<div className="order-item">
					<span>VAT:</span>
					{vat ? (
						<span>N{vat.toLocaleString()}(7.5%)</span>
					) : (
						<span>-(7.5%)</span>
					)}
				</div>
				<div className="order-footer">
					<h3>Total Price:</h3>
					<h3 key={Math.random()}>
						{price ? (
							<span>N{price.toLocaleString()}</span>
						) : (
							"N0.00"
						)}
					</h3>
				</div>
			</div>

			{/* input search fields */}

			<div className="location-search">
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
						<div className="input-section pricing-input">
							<input
								{...getInputProps({
									placeholder: "Enter Pickup Address",
								})}
								type="Text"
								name="Pickup-Address"
								id="Pickup-Address"
							/>
							<div className="autocomplete-dropdown-container">
								{loading ? (
									<div className=" address-loading spinner3"></div>
								) : null}
								{suggestions.map((suggestion) => {
									const style = {
										backgroundColor: suggestion.active
											? "#66cc66"
											: "#fff",
										cursor: suggestion.active
											? "pointer"
											: "pointer",
										padding: suggestion.active
											? "15px"
											: "15px",
										border: suggestion.active
											? "1px solid #dfe0eb"
											: "1px solid #dfe0eb",
										textAlign: suggestion.active
											? "center"
											: "center",
										fontSize: suggestion.active
											? "12px"
											: "12px",
									};
									return (
										<div
											key={Math.random()}
											{...getSuggestionItemProps(
												suggestion,
												{ style }
											)}
										>
											{suggestion.description}
										</div>
									);
								})}
							</div>
						</div>
					)}
				</PlacesAutocomplete>

				<div className="location-search-separator">
					<MdMoreHoriz />
				</div>

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
						<div className="input-section pricing-input">
							<input
								{...getInputProps({
									placeholder: "Enter Drop-off address",
								})}
								// style={{width: '100%'}}
								// className="input"
								type="Text"
								name="dropoff-Address"
								id="dropoff-Address2"
							/>
							<div className="autocomplete-dropdown-container">
								{loading ? (
									<div className=" address-loading spinner3"></div>
								) : null}
								{suggestions.map((suggestion) => {
									const style = {
										backgroundColor: suggestion.active
											? "#66cc66"
											: "#fff",
										cursor: suggestion.active
											? "pointer"
											: "pointer",
										padding: suggestion.active
											? "15px"
											: "15px",
										border: suggestion.active
											? "1px solid #dfe0eb"
											: "1px solid #dfe0eb",
										textAlign: suggestion.active
											? "center"
											: "center",
										fontSize: suggestion.active
											? "12px"
											: "12px",
									};
									return (
										<div
											key={Math.random()}
											{...getSuggestionItemProps(
												suggestion,
												{ style }
											)}
										>
											{suggestion.description}
										</div>
									);
								})}
							</div>
						</div>
					)}
				</PlacesAutocomplete>
			</div>

			{/* button */}
			<div className="button-pricing">
				<button
					className="btn-primary-pricing text text-regular"
					type="submit"
					onClick={calculate}
					disabled={!address || !address2}
				>
					{" "}
					{isCalculating ? (
						<div className="sending-message">
							<div className="spinner2"></div>
							<p>Processing</p>
						</div>
					) : (
						"Calulate price"
					)}
				</button>
			</div>
		</div>
	);
}

export default Pricing;
