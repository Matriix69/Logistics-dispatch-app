import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import illustration1 from "../images/illustration1.png";
import illustration2 from "../images/illustration2.png";
import illustration3 from "../images/illustration3.png";

export function PrivateRoute({ children, ...rest }) {
	const { currentUser } = useAuth();
	const user = currentUser;
	return (
		<Route
			{...rest}
			render={() => {
				return user && user.emailVerified === true ? (
					children
				) : (
					<Redirect to="/business" />
				);
			}}
		/>
	);
}

export function PrivateRoute2({ children, ...rest }) {
	const { currentUser } = useAuth();
	const user = currentUser;
	return (
		<Route
			{...rest}
			render={() => {
				return user &&
					user.emailVerified === true &&
					user.admin === true ? (
					children
				) : (
					<Redirect to="/Glogistics" />
				);
			}}
		/>
	);
}

export const slides = [
	{
		image: illustration1,
		title: "Accessible and Affordable",
		description: "Fast. Reliable. Affordable.",
	},
	{
		image: illustration2,
		title: "Tested and Trusted",
		description: "Your trusted delivery partner.",
	},
	{
		image: illustration3,
		title: "Safe and Secure",
		description: "Swift and safe delivery of packages",
	},
];

const getAddressComp = (addressObject, compName) => {
	return (
		addressObject[0].address_components.find((component) =>
			component.types.some((e) => e.includes(compName))
		) || { long_name: "" }
	).long_name;
};

export const storeAddressComponents = (addressObject, latLng) => {
	const addressComponents = {
		full_address: addressObject[0].formatted_address,
		county: getAddressComp(addressObject, "country"),
		state: getAddressComp(addressObject, "administrative_area_level_1"),
		street_name: getAddressComp(
			addressObject,
			"administrative_area_level_2"
		),
		// street_number: getAddressComp(addressObject, 'street_number'),
		// zip_code: getAddressComp(addressObject, 'postal_code'),
		coordinates: `${latLng.lat},${latLng.lng}`,
	};
	return addressComponents;
};

export const formatPhoneNumber = (rawPhone) => {
	let phone = rawPhone;

	if (!phone || phone.trim() === "") return phone;

	if (phone.length > 7) {
		if (
			phone.startsWith("+234") ||
			phone.startsWith("234") ||
			phone.startsWith("+2340")
		) {
			phone = phone.replace(/\+?2340?/, "");
		}

		if (phone.startsWith("0")) {
			phone = phone.replace(/^0/, "");
		}
	}

	return phone.replace(/[^\d]/g, "");
};

export const formatToNumber = (value) => {
	if (!value || value.trim() === "") return value;
	return value.replace(/[^\d]/g, "");
};
