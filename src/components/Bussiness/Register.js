import { useState } from "react";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../Firebase";
import { doc, setDoc } from "firebase/firestore";

const validationSchema = yup.object().shape({
	email: yup.string().email("This is not a valid email").required("Required"),
	firstname: yup.string().required("Required"),
	lastname: yup.string().required("Required"),
	address: yup.string().required("Required"),
	phonenumber: yup
		.number()
		.typeError("numbers only")
		.required("Most be a phone number")
		.positive()
		.integer(),
	password: yup
		.string()
		.min(6)
		.required("password must be atleast 6 characters"),
	confirmpassword: yup
		.string()
		.oneOf([yup.ref("password"), null], "Passwords don't match")
		.required("Passwords don't match"),
	acceptTerms: yup
		.bool()
		.oneOf([true], "Terms & Conditions must be accepted"),
});

export default function Register({ onRouteChange, handleOpen }) {
	const history = useHistory();
	const [error, setError] = useState(null);
	const [focusedName, setFocusedName] = useState(false);
	const [focusedLastName, setFocusedLastName] = useState(false);
	const [focusedPhone, setFocusedPhone] = useState(false);
	const [focusedEmail, setFocusedEmail] = useState(false);
	const [focusedPassword, setFocusedPassword] = useState(false);
	const [focusedPasswordConfirm, setFocusedPasswordConfirm] = useState(false);
	const [focusedAddress, setFocusedAddress] = useState(false);

	const { signup, updateUser } = useAuth();
	//firstname
	function handleFocus() {
		setFocusedName(true);
	}
	function handleFocusOut() {
		setFocusedName(false);
	}

	//last name
	function handleFocusLastName() {
		setFocusedLastName(true);
	}
	function handleFocusOutLastName() {
		setFocusedLastName(false);
	}

	//email
	function handleFocusEmail() {
		setFocusedEmail(true);
	}
	function handleFocusOutEmail() {
		setFocusedEmail(false);
	}

	//phone number
	function handleFocusPhone() {
		setFocusedPhone(true);
	}
	function handleFocusOutPhone() {
		setFocusedPhone(false);
	}

	//password
	function handleFocusPassword() {
		setFocusedPassword(true);
	}
	function handleFocusOutPassword() {
		setFocusedPassword(false);
	}

	//password comfirm
	function handleFocusPasswordConfirm() {
		setFocusedPasswordConfirm(true);
	}
	function handleFocusOutPasswordConfirm() {
		setFocusedPasswordConfirm(false);
	}

	//password
	function handleFocusAddress() {
		setFocusedAddress(true);
	}
	function handleFocusOutAddress() {
		setFocusedAddress(false);
	}

	return (
		<div>
			<div>
				<p className="text text-title-register">Create Account</p>
				<Formik
					initialValues={{
						email: "",
						firstname: "",
						lastname: "",
						address: "",
						phonenumber: "",
						password: "",
						confirmpassword: "",
						acceptTerms: false,
					}}
					validationSchema={validationSchema}
					onSubmit={(values, { setSubmitting, resetForm }) => {
						const username = values.email;
						const password = values.password;
						const name = values.firstname + " " + values.lastname;
						const address = values.address;
						const phone = values.phonenumber;

						const profileUpdateDetails = {
							displayName: name,
							photoURL: phone,
						};
						const profileDetailsToDb = {
							username: name,
							email: username,
							phone: phone,
							address: address,
						};
						const walletBalance = {
							amount: 0,
						};

						async function signUp() {
							try {
								setSubmitting(true);
								setError(null);

								const newUser = await signup(
									username,
									password
								);
								if (newUser.user) {
									await updateUser(profileUpdateDetails);
								}

								const userInfoRef = doc(
									db,
									"users",
									newUser.user.uid
								);
								const userwalletAccount = doc(
									db,
									"users",
									newUser.user.uid,
									"wallet",
									"balaance"
								);
								await Promise.all([
									setDoc(userInfoRef, profileDetailsToDb),
									setDoc(userwalletAccount, walletBalance),
								]);
								console.log("good");
								history.push("/confirm-signup");
							} catch (error) {
								let err2 = null;
								if (
									error &&
									error.message.toLowerCase() ===
										"Firebase: Error (auth/timeout).".toLowerCase()
								) {
									err2 = {
										message:
											"Request timeout, please check your internet connect",
									};
								} else if (
									error &&
									error.message.toLowerCase() ===
										"Firebase: Error (auth/network-request-failed).".toLowerCase()
								) {
									err2 = {
										message:
											"Request timeout, please check your internet connect",
									};
								} else if (
									error &&
									error.message.toLowerCase() ===
										"Firebase: Error (auth/email-already-in-use).".toLowerCase()
								) {
									err2 = {
										message: "User already exists",
									};
								} else {
									err2 = {
										message:
											"something went wrong, please try again",
									};
								}
								setError(err2.message);
								setSubmitting(false);
								// console.log(error, err2);
							}
						}
						signUp();
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
							<div
								className={
									focusedName
										? "input-business input-business-highlight"
										: errors.firstname && touched.firstname
										? "input-business error errmsg"
										: "input-business"
								}
							>
								<p className="text text-small input-label">
									First Name
								</p>
								<div className="input-field">
									<input
										name="firstname"
										type="text"
										onChange={handleChange}
										onBlur={(e) => {
											handleBlur(e);
											handleFocusOut(e);
										}}
										value={values.firstname}
										onFocus={handleFocus}
									/>
								</div>
							</div>
							{errors.firstname && touched.firstname ? (
								<div className="errorMessage">
									{errors.firstname}
								</div>
							) : null}
							<div
								className={
									focusedLastName
										? "input-business input-business-highlight"
										: errors.lastname && touched.lastname
										? "input-business error errmsg"
										: "input-business"
								}
							>
								<p className="text text-small input-label">
									Last Name
								</p>
								<div className="input-field">
									<input
										name="lastname"
										type="text"
										onChange={handleChange}
										onBlur={(e) => {
											handleBlur(e);
											handleFocusOutLastName(e);
										}}
										value={values.lastname}
										onFocus={handleFocusLastName}
									/>
								</div>
							</div>
							{errors.lastname && touched.lastname ? (
								<div className="errorMessage">
									{errors.lastname}
								</div>
							) : null}
							<div
								className={
									focusedPhone
										? "input-business input-business-highlight"
										: errors.phonenumber &&
										  touched.phonenumber
										? "input-business error errmsg"
										: "input-business"
								}
							>
								<p className="text text-small input-label">
									Phone Number
								</p>
								<div className="input-field">
									<p className="text text-regular prepend">
										+234
									</p>
									<input
										name="phonenumber"
										type="tel"
										onBlur={(e) => {
											handleBlur(e);
											handleFocusOutPhone(e);
										}}
										value={values.phonenumber}
										onFocus={handleFocusPhone}
										onChange={(e) => {
											e.preventDefault();
											handleChange(e);
											const { value } = e.target;
											const regex = /^[0-9\b]+$/;
											if (
												value === "" ||
												regex.test(value)
											) {
												setFieldValue(
													"phonenumber",
													value
												);
											}
										}}
									/>
								</div>
							</div>
							{errors.phonenumber && touched.phonenumber ? (
								<div className="errorMessage">
									{errors.phonenumber}
								</div>
							) : null}
							<div
								className={
									focusedPassword
										? "input-business input-business-highlight"
										: errors.password && touched.password
										? "input-business error errmsg"
										: "input-business"
								}
							>
								<p className="text text-small input-label">
									Password
								</p>
								<div className="input-field">
									<input
										name="password"
										type="password"
										onChange={handleChange}
										onBlur={(e) => {
											handleBlur(e);
											handleFocusOutPassword(e);
										}}
										onFocus={handleFocusPassword}
										value={values.password}
									/>
								</div>
							</div>
							{errors.password && touched.password ? (
								<div className="errorMessage">
									{errors.password}
								</div>
							) : null}
							<div
								className={
									focusedPasswordConfirm
										? "input-business input-business-highlight"
										: errors.confirmpassword &&
										  touched.confirmpassword
										? "input-business error errmsg"
										: "input-business"
								}
							>
								<p className="text text-small input-label">
									Confirm Password
								</p>
								<div className="input-field">
									<input
										name="confirmpassword"
										type="password"
										onChange={handleChange}
										onBlur={(e) => {
											handleBlur(e);
											handleFocusOutPasswordConfirm(e);
										}}
										onFocus={handleFocusPasswordConfirm}
										value={values.confirmpassword}
									/>
								</div>
							</div>
							{errors.confirmpassword &&
							touched.confirmpassword ? (
								<div className="errorMessage">
									{errors.confirmpassword}
								</div>
							) : null}
							<div
								className={
									focusedEmail
										? "input-business input-business-highlight"
										: errors.email && touched.email
										? "input-business error errmsg"
										: "input-business"
								}
							>
								<p className="text text-small input-label">
									Corporate email
								</p>
								<div className="input-field">
									<input
										name="email"
										type="email"
										onChange={handleChange}
										onBlur={(e) => {
											handleBlur(e);
											handleFocusOutEmail(e);
										}}
										onFocus={handleFocusEmail}
										value={values.email}
									/>
								</div>
							</div>
							{errors.email && touched.email ? (
								<div className="errorMessage">
									{errors.email}
								</div>
							) : null}
							<div
								className={
									focusedAddress
										? "input-business input-business-highlight"
										: errors.address && touched.address
										? "input-business error errmsg"
										: "input-business"
								}
							>
								<p className="text text-small input-label">
									Company Address
								</p>
								<div className="input-field">
									<input
										name="address"
										type="text"
										onChange={handleChange}
										onBlur={(e) => {
											handleBlur(e);
											handleFocusOutAddress(e);
										}}
										onFocus={handleFocusAddress}
										value={values.address}
									/>
								</div>
							</div>
							{errors.address && touched.address ? (
								<div className="errorMessage">
									{errors.address}
								</div>
							) : null}
							<div className="tandc-checkbox">
								<Field
									type="checkbox"
									name="acceptTerms"
									onChange={(e) => {
										handleChange(e);
										if (e.target.checked) {
											handleOpen();
										} else {
											return;
										}
									}}
								/>
								<p
									className="text text-small tandc-label"
									onClick={handleOpen}
								>
									Accept terms and conditions
								</p>
							</div>
							{errors.acceptTerms && touched.acceptTerms ? (
								<div className="errorMessage">
									{errors.acceptTerms}
								</div>
							) : null}

							{error ? (
								<p className="errorMessage">{error}</p>
							) : null}

							{/* botton */}
							<div className="btn-access">
								<button
									className="btn-primary-contact text text-regular"
									type="submit"
									disabled={isSubmitting}
								>
									{isSubmitting ? (
										<div className="sending-message">
											<div className="spinner2"></div>
											<p>Processing</p>
										</div>
									) : (
										"Create Account"
									)}
								</button>
							</div>
							<p className="text text-small signin-request">
								Already have an account?
								<span
									onClick={onRouteChange}
									className="signup-link"
								>
									{" "}
									Log In!
								</span>
							</p>
						</form>
					)}
				</Formik>
			</div>
		</div>
	);
}
