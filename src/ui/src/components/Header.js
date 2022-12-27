import React from "react";
import AppBar from "./controls/AppBar";
import HLine from "./controls/HLine";
import SignWorkflow from "./controls/SignWorkflow";
import getText from "../messages";
import SwipeableEdgeDrawer from "./controls/Drawer";
import * as constants from "../utils/constants";

const Header = () => {
	const routeHandler = (oEvent) => {
		console.log(oEvent);
	};
	const [drawerState, setDrawerState] = React.useState({
		open: false,
		content: SignWorkflow,
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
						content: SignWorkflow,
						contentProps: {
							type: constants.SIGNUP
						}
					});
				}}
				login={(e) => {
					setDrawerState({
						open: true,
						content: SignWorkflow,
						contentProps: {
							type: constants.SIGNIN
						}
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
