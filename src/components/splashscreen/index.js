import "./splash.css";
import { ReactComponent as Loader } from "./loader.svg";
import { ReactComponent as Greensexlogo } from "../../images/greensexlogo.svg";

export default function Splash() {
	return (
		<div className="splashContainerr">
			{/* <h1>Greens365</h1> */}
			<Greensexlogo
				style={{ height: "auto", width: "160px", marginBottom: "1rem" }}
			/>

			<div className="splashSpinnerr"></div>
			<Loader />
		</div>
	);
}
