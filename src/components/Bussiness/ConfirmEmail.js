import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import emailpic from "../../images/emailpic.png";

function ConfirmEmail() {
	const { currentUser, verifyEmail } = useAuth();
	const history = useHistory();

	useEffect(() => {
		try {
			verifyEmail();
			console.log("email sent");
		} catch {
			console.log("something went wrong");
		}
	}, [currentUser, verifyEmail]);

	return (
		<div className="confirm-email">
			<img src={emailpic} alt="confirm email" />
			<h2>Welcome!</h2>
			<p className="text text-regular noline-height">
				We have sent a verification link to your email address, please
				verify before you can Login into account, thank you!
			</p>
			<button
				onClick={() => history.push("/business")}
				className="btn-primary text text-regular"
				type="button"
			>
				Verified & Login
			</button>
		</div>
	);
}

export default ConfirmEmail;
