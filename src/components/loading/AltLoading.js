import styled from "styled-components";

const Modal = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: rgba(25, 33, 43, 0.4);
	position: fixed;
	left: 0;
	top: 0;
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-items: center;
	padding: 10px;

	z-index: 100000000;
`;
const Spinner = styled.div`
	& {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		border: 2px solid #66cc66;
		border-right: 2px solid transparent;
		animation: spin 0.5s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
`;

export default function LoadingAnimation({ data }) {
	return (
		<Modal>
			<div className="card">
				<div className="cardbody" style={{ padding: "1rem" }}>
					<Spinner></Spinner>
				</div>
			</div>
			{data && (
				<div className="text text-regular" style={{ color: "#fff" }}>
					{data}
				</div>
			)}
		</Modal>
	);
}
