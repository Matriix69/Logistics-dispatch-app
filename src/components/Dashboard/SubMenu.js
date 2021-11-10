import { NavLink } from "react-router-dom";

const SubMenu = ({ item, index, signOut }) => {
	return (
		<NavLink
			className="SidebarLink"
			activeClassName="active"
			onClick={item.onclick === "signOut" ? signOut : null}
			key={index}
			exact
			to={item.path}
		>
			{item.icon}
			<div className="SidebarLabel">{item.title}</div>
		</NavLink>
	);
};

export default SubMenu;
