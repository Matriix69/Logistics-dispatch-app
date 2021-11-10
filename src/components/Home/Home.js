import { Switch, Route } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import Comtact from "../Contact/Contact";
import Pricing from "../Pricing/Pricing";
import Deliveries from "../Deliveries/Deliveries";
import Bussiness from "../Bussiness/Bussiness";
import ConfirmEmail from "../Bussiness/ConfirmEmail";
import ResetPass from "../Bussiness/ResetPass";
import NotFound from "../NotFound";
import Slide from "../Slide/Slide";

export default function Home() {
	return (
		<div className="wrapper">
			<Navigation />
			<Switch>
				<Route exact path="/" component={Slide} />
				<Route exact path="/contact" component={Comtact} />
				<Route exact path="/pricing" component={Pricing} />
				<Route exact path="/request-dispatch" component={Deliveries} />
				<Route exact path="/business" component={Bussiness} />
				<Route exact path="/reset-password" component={ResetPass} />
				<Route exact path="/confirm-signup" component={ConfirmEmail} />
				<Route component={NotFound} />
			</Switch>
		</div>
	);
}
