import React from "react";
import AppBar from "./controls/AppBar";
import HLine from "./controls/HLine";
import getText from "../messages";
const Header = () => {
	const routeHandler = (oEvent) => {
		console.log(oEvent);
        
	};

	return (
		<>
			<AppBar
				title={getText("title")}
				settings={[getText("home"), getText("profile"), getText("logout")]}
				click={routeHandler}
                userInfo={{firstname: "Ashwani", icon: ""}}
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
