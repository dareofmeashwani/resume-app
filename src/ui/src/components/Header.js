import React from "react";
import AppBar from "./controls/AppBar";
import HLine from "./controls/HLine";
import getText from "../messages";
const Header = () => {
	const routeHandler = (oEvent) => {
		console.log(oEvent);
	};
	const userInfo = { firstname: "Ashwani", icon: "" };
	return (
		<>
			<AppBar
				title={getText("title")}
				settings={[getText("home"), getText("profile"), getText("logout")]}
				click={routeHandler}
				userInfo={null}
				register={(e) => {
					console.log(e);
				}}
				login={(e) => {
					console.log(e);
				}}
				pages={[
					getText("aboutMe"),
					getText("meeting"),
					getText("gallery"),
					getText("downloads"),
					getText("contact")
				]}
			/>
			<HLine />
		</>
	);
};

export default Header;
