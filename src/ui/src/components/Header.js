import React from "react";
import AppBar from "./controls/AppBar";
import HLine from "./controls/HLine";
import SignIn from "./controls/SignInForm";
import SignUp from "./controls/SignUpForm";
import getText from "../messages";
import SwipeableEdgeDrawer from "./controls/Drawer";

const Header = () => {
	const routeHandler = (oEvent) => {
		console.log(oEvent);
	};
	const [drawerState, setDrawerState] = React.useState({
		open: false,
		content: null,
		title: ""
	});
	const userInfo = {
		firstname: "Ashwani",
		icon: "",
		name: "Ashwani Kumar Verma"
	};
	return (
		<>
			<AppBar
				title={getText("title")}
				settings={[getText("home"), getText("profile"), getText("logout")]}
				click={routeHandler}
				userInfo={null}
				register={(e) => {
					setDrawerState({
						open: true,
						content: SignUp,
						title: getText("registerTitle")
					});
				}}
				login={(e) => {
					setDrawerState({
						open: true,
						content: SignIn,
						title: getText("loginTitle")
					});
				}}
				pages={[
					getText("aboutMe"),
					getText("meeting"),
					getText("gallery"),
					getText("downloads"),
					getText("contact")
				]}
			/>
			<SwipeableEdgeDrawer initial={drawerState} />
			<HLine />
		</>
	);
};

export default Header;
