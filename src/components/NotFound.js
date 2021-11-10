import { Link } from "react-router-dom";

const styles = {
	contentWrapper: {
		width: "100%",
		height: "85%",
		position: "absolute",
		textAlign: "center",
		flex: 1,
		alignItems: "center",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		left: 0,
		top: "15%",
	},
};

export default function NotFound() {
	return (
		<div style={styles.contentWrapper}>
			<p className="text text-large">Page Not Found</p>
			<p variant="text text-medium">
				<Link to="/">Go back home</Link>
			</p>
		</div>
	);
}
