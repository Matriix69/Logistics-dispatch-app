import { useState } from "react";
import Modal from "../../Modal/Modal";
import DashContact from "./DashContact";
import Settings from "./Settings";
import { useLocation } from "react-router-dom";
import { ReactComponent as Inta } from "../../../images/instagram.svg";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	justify-content: space-evenly;
	width: 100%;

	@media (max-width: 990px) {
		flex-flow: column;
	}
`;
const SubContainer1 = styled.div`
	width: 49.5%;
	margin-right: 5px;
	@media (max-width: 990px) {
		margin-right: 0px;
		width: 100%;
	}
	.card {
	}
`;
// const SubContainer2 = styled.div`
// 	width: 49.5%;
// 	@media (max-width: 900px) {
// 		width: 100%;
// 	}
// `;

function Contact() {
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const location = useLocation();

	//close modals

	const handleCloseSuccess = () => {
		setSuccess(false);
	};

	const handleCloseError = () => {
		setError(false);
	};

	return (
		<Container>
			<SubContainer1>
				<div className="card">
					<div className="cardbody">
						{location.pathname === "/dashboard/support" ? (
							<DashContact
								success={success}
								error={error}
								setError={setError}
								setSuccess={setSuccess}
							/>
						) : location.pathname === "/dashboard/settings" ? (
							<Settings />
						) : null}
						<div
							className="contact-details"
							style={{ marginTop: "50px" }}
						>
							<p className="text text-medium shift">
								Contact Details
							</p>
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
								<Inta
									style={{ width: "20px", height: "auto" }}
								/>
								<p className="text text-regular no-margin">
									@greensexlogistics
								</p>
							</a>
						</div>
					</div>
				</div>
			</SubContainer1>

			<Modal
				error={error}
				handleCloseSuccess={handleCloseSuccess}
				success={success}
				handleCloseError={handleCloseError}
			/>
		</Container>
	);
}

export default Contact;
