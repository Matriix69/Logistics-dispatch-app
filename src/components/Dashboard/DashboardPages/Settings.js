import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useAuth } from "../../../context/AuthContext";

const validationSchema = yup.object().shape({
	password: yup
		.string()
		.min(6)
		.required("password must be atleast 6 characters"),
	confirmpassword: yup
		.string()
		.oneOf([yup.ref("password"), null], "Passwords don't match")
		.required("Passwords don't match"),
});

export default function Register() {
	const [message, setMessage] = useState(null);
	const [error, setError] = useState(null);
	const { updatePass } = useAuth();

	return (
		<div className="contact-wrapper-child">
			<p className="text text-medium shift">Change Password</p>
			{error ? <p className="errordashboard">{error}</p> : null}
			{message ? <p className="success-message">{message}</p> : null}
			<Formik
				initialValues={{ password: "", confirmpassword: "" }}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					const password = values.password;
					async function changePassword() {
						try {
							setSubmitting(true);
							setError(null);
							setMessage(null);
							await updatePass(password);
							setMessage("Password updated!");
							resetForm();
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
					changePassword();
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
						<div className="input-section">
							<label
								className={
									touched.password && errors.password
										? "text text-small errmsg"
										: "text text-small"
								}
								htmlFor="subject"
							>
								New Password
							</label>
							<input
								className={
									touched.password && errors.password
										? "error"
										: null
								}
								type="password"
								name="password"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
							/>
							{errors.password && touched.password ? (
								<div className="errorMessage">
									{errors.password}
								</div>
							) : null}
						</div>

						<div className="input-section">
							<label
								className={
									touched.confirmpassword &&
									errors.confirmpassword
										? "text text-small errmsg"
										: "text text-small"
								}
								htmlFor="name"
							>
								Confirm Password
							</label>
							<input
								className={
									touched.confirmpassword &&
									errors.confirmpassword
										? "error"
										: null
								}
								type="password"
								name="confirmpassword"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.confirmpassword}
							/>
							{errors.confirmpassword &&
							touched.confirmpassword ? (
								<div className="errorMessage">
									{errors.confirmpassword}
								</div>
							) : null}
						</div>

						{/* botton */}
						<div className="">
							<input
								className="btn-primary-contact text text-regular"
								type="submit"
								value="Change Password"
								disabled={isSubmitting}
							/>
						</div>
					</form>
				)}
			</Formik>
		</div>
	);
}
