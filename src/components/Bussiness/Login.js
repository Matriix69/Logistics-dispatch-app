import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const validationSchema = yup.object().shape({
	email: yup
		.string()
		.email("Must be a valid email address")
		.required("Required"),
	password: yup
		.string()
		.min(6)
		.required("password must be atleast 6 characters"),
});

export default function Login({ onRouteChange }) {
	const history = useHistory();
	const [error, setError] = useState(null);

	const { login, currentUser } = useAuth();

	const [focusedEmail, setFocusedEmail] = useState(false);
	const [focusedPassword, setFocusedPassword] = useState(false);

	//email
	function handleFocusEmail() {
		setFocusedEmail(true);
	}
	function handleFocusOutEmail() {
		setFocusedEmail(false);
	}

	//password
	function handleFocusPassword() {
		setFocusedPassword(true);
	}
	function handleFocusOutPassword() {
		setFocusedPassword(false);
	}

	return (
		<div>
			<p className="text text-title-register">Login</p>
			<Formik
				initialValues={{ email: "", password: "" }}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					const username = values.email;
					const password = values.password;
					async function signIn() {
						try {
							setError(null);
							setSubmitting(true);
							await login(username, password);
							let err = null;
							if (
								currentUser &&
								currentUser.emailVerified === false
							) {
								err =
									"Account not verified, a link was sent to your email";
								setError(err);
								setSubmitting(false);
								return;
							}
							setTimeout(() => {
								history.push("/dashboard");
							}, 1000);
						} catch (error) {
							let err2 = null;
							if (
								error &&
								error.message.toLowerCase() ===
									"Firebase: Error (auth/user-not-found).".toLowerCase()
							) {
								err2 = {
									message:
										"Not an exsiting user, please create an account",
								};
							} else if (
								error &&
								error.message.toLowerCase() ===
									"Firebase: Error (auth/wrong-password).".toLowerCase()
							) {
								err2 = {
									message: "Wrong password",
								};
							} else if (
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
							} else {
								err2 = {
									message:
										"something went wrong, please try again",
								};
							}
							// !error.message
							// 	? (err2 = { message: error })
							// 	: (err2 = error);
							setError(err2.message);
							setSubmitting(false);
							// console.log(err2);
						}
					}
					signIn();
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
				}) => (
					<form onSubmit={handleSubmit}>
						<div
							className={
								focusedEmail
									? "input-business input-business-highlight"
									: errors.email && touched.email
									? "input-business error errmsg"
									: "input-business"
							}
						>
							<p
								className={
									focusedEmail
										? "text text-small input-label input-label-highlight"
										: "text text-small input-label"
								}
							>
								Email
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
							<div className="errorMessage">{errors.email}</div>
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
							<p
								className={
									focusedPassword
										? "text text-small input-label input-label-highlight"
										: "text text-small input-label"
								}
							>
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

						<p
							onClick={() => history.push("/reset-password")}
							className="text text-small text-right"
						>
							Forgot Password?
						</p>

						{error ? <p className="errorMessage">{error}</p> : null}

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
									"Login"
								)}
							</button>
						</div>
						<p className="text text-small signin-request">
							Don't have an account??
							<span
								onClick={onRouteChange}
								className="signup-link"
							>
								{" "}
								Sign Up!
							</span>
						</p>
					</form>
				)}
			</Formik>
		</div>
	);
}
