import { Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Dashboard/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Home from "./components/Home/Home";

// const Home = lazy(() => import("./components/Home/Home"));
// const Navbar = lazy(() => import("./components/Dashboard/Navbar"));
// const {AuthProvider} = lazy(() => import("./context/AuthContext"));

function App() {
	return (
		//  <Suspense fallback={<h1>Loading profile...</h1>}>
		<AuthProvider>
			<Switch>
				<Route path="/dashboard" component={Navbar} />
				<Route path="/" component={Home} />
			</Switch>
		</AuthProvider>
		// </Suspense>
	);
}

export default App;
