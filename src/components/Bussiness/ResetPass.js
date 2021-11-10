import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";

const validationSchema = yup.object().shape({
	email: yup
		.string()
		.email("Must be a valid email address")
		.required("Invalid Email Address"),
});

export default function Register() {
	const [focusedEmail, setFocusedEmail] = useState(false);
	const [error, setError] = useState(null);
	const [message, setMessage] = useState(null);
	//email
	function handleFocusEmail() {
		setFocusedEmail(true);
	}
	function handleFocusOutEmail() {
		setFocusedEmail(false);
	}

	const { resetPassword } = useAuth();

	return (
		<div className="password-reset-wrapper">
			<div className="password-reset">
				<p class="text text-title-register">Reset Password</p>
				{message ? <p className="success-message">{message}</p> : null}
				<Formik
					initialValues={{ email: "" }}
					validationSchema={validationSchema}
					onSubmit={(values, { setSubmitting, resetForm }) => {
						const username = values.email;
						async function reset() {
							setSubmitting(true);
							try {
								setError(null);
								setMessage(null);
								await resetPassword(username);
								setMessage(
									"A link to reset your password has been sent to your email address"
								);
								setSubmitting(false);
							} catch (error) {
								let err = null;
								!error.message
									? (err = { message: error })
									: (err = error);
								setError(err.message);
								setSubmitting(false);
								console.log(err);
							}
						}
						reset();
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
										? "input-reset input-business-highlight"
										: errors.email && touched.email
										? "input-reset error errmsg"
										: "input-reset"
								}
							>
								<p className="text text-small input-label">
									Email
								</p>
								<div className="input-field">
									<input
										name="email"
										type="email"
										placeholder="i.e xyz@emailProvider.com..."
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

							{/* botton */}
							<div className="btn-forgot-pass">
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
										"Continue"
									)}
								</button>
							</div>

							{errors.email && touched.email ? (
								<div className="errorMessage">
									{errors.email}
								</div>
							) : null}
							{error ? (
								<p className="errorMessage">{error}</p>
							) : null}
						</form>
					)}
				</Formik>
			</div>
		</div>
	);
}
