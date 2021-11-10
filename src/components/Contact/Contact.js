import { useState, useEffect } from "react";
import "../../css/Contact.css";
import { Formik } from "formik";
import emailjs from "emailjs-com";
import Modal from "../Modal/Modal";
import * as yup from "yup";
import classnames from "classnames";
import { ReactComponent as Inta } from "../../images/instagram.svg";

function Contact() {
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [pageLoaded, setPageLoaded] = useState(false);

	//close modals

	const handleCloseSuccess = () => {
		setSuccess(false);
	};

	const handleCloseError = () => {
		setError(false);
	};

	//validation schema

	const validationSchema = yup.object().shape({
		email: yup
			.string()
			.email("Must be a valid email address")
			.required("Required"),
		subject: yup
			.string()
			.min(5, "Please be eleborate")
			.required("Required"),
		message: yup
			.string()
			.min(20, "Please be elaborate with your message")
			.required("Required"),
	});

	useEffect(() => {
		let timeOut = setTimeout(() => {
			setPageLoaded(true);
		}, 50);
		return () => {
			clearTimeout(timeOut);
		};
	}, []);

	return (
		<div>
			<div
				className={classnames({
					"contact-wrapper": true,
					"show-page": pageLoaded,
				})}
			>
				<div className="contact-wrapper-child text-darkAlt">
					<p className="text text-medium shift text-darkAlt">
						Have Issues? Send Us a Message!
					</p>
					<Formik
						initialValues={{ email: "", subject: "", message: "" }}
						validationSchema={validationSchema}
						onSubmit={(values, { setSubmitting, resetForm }) => {
							setSubmitting(true);

							let tempParams = {
								email: values.email,
								subject: values.subject,
								message: values.message,
							};
							emailjs
								.send(
									"service_uijhw6c",
									"template_8w4m6gp",
									tempParams,
									"user_PxSsadZgFpBu2FGtHlaxw"
								)
								.then(
									(result) => {
										setSuccess(true);
										resetForm();
										setSubmitting(false);
										console.log(result.text);
									},
									(error) => {
										setError(true);
										setSubmitting(false);
										console.log(error.text);
									}
								);
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
											touched.email && errors.email
												? "text text-small errmsg"
												: "text text-small text-darkAlt"
										}
										htmlFor="email"
									>
										Your Email
									</label>
									<input
										className={
											touched.email && errors.email
												? "error"
												: null
										}
										type="email"
										name="email"
										id="email"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.email}
									/>
									{errors.email && touched.email ? (
										<div className="errorMessage">
											{errors.email}
										</div>
									) : null}
								</div>

								<div className="input-section">
									<label
										className={
											touched.subject && errors.subject
												? "text text-small errmsg"
												: "text text-small"
										}
										htmlFor="subject"
									>
										Subject
									</label>
									<input
										className={
											touched.subject && errors.subject
												? "error"
												: null
										}
										type="Text"
										name="subject"
										id="subject"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.subject}
									/>
									{errors.subject && touched.subject ? (
										<div className="errorMessage">
											{errors.subject}
										</div>
									) : null}
								</div>

								<div className="input-section">
									<label
										className={
											touched.message && errors.message
												? "text text-small errmsg"
												: "text text-small"
										}
										htmlFor="name"
									>
										Message
									</label>
									<textarea
										className={
											touched.message && errors.message
												? "error"
												: null
										}
										name="message"
										id="message"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.message}
										col="4"
										rows="4"
									></textarea>
									{errors.message && touched.message ? (
										<div className="errorMessage">
											{errors.message}
										</div>
									) : null}
								</div>

								{/* botton */}
								<div className="">
									<button
										className="btn-primary-contact text text-regular"
										type="submit"
										disabled={isSubmitting}
									>
										{isSubmitting ? (
											<div className="sending-message">
												<div className="spinner2"></div>
												<p>Sending message...</p>
											</div>
										) : (
											"Send message"
										)}
									</button>
								</div>
							</form>
						)}
					</Formik>
				</div>

				<div className="contact-wrapper-child text-darkAlt">
					<div className="contact-details">
						<p className="text text-medium shift">
							Contact Details
						</p>
						{/* <a href="tel:+2349038355554"><FiPhone style={{fontSize:"20px"}}/><p className="text text-regular no-margin">+234 903 835 5554</p></a> */}
						<a href="tel:+2347046624412">
							<p className="text text-regular no-margin">
								+234 704 662 4412
							</p>
						</a>
						<a
							href="https://instagram.com/matrix_69_/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Inta style={{ width: "20px", height: "auto" }} />
							<p className="text text-regular no-margin">
								@greensexlogistics
							</p>
						</a>
						{/* <a href="https://instagram.com/greens365logistics" target="_blank" rel="noopener noreferrer"><FiInstagram style={{fontSize:"20px"}}/><p className="text text-regular no-margin">@greens365logistics</p></a> */}
					</div>
				</div>
			</div>
			<Modal
				error={error}
				handleCloseSuccess={handleCloseSuccess}
				success={success}
				handleCloseError={handleCloseError}
			/>
		</div>
	);
}

export default Contact;
