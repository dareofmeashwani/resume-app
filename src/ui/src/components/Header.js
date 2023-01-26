import React, { useEffect } from "react";
import AppBar from "./controls/AppBar";
import { useNavigate } from "react-router-dom";
import SignWorkflow from "./SignWorkflow";
import getText from "../messages";
import SwipeableEdgeDrawer from "./controls/Drawer";
import * as constants from "../utils/constants";
import { signOut } from "../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const Header = (props) => {
	const navigate = useNavigate();
	const [drawerState, setDrawerState] = React.useState({
		open: false,
		content: SignWorkflow
	});
	const [userInfo, setUserInfo] = React.useState(null);
	const dispatch = useDispatch();
	const user = useSelector((state) => {
		return state.userData.user;
	});
	const pages = [
		{ id: "aboutme", text: getText("aboutMe") },
		userInfo ? { id: "meeting", text: getText("meeting") } : null,
		{ id: "gallery", text: getText("gallery") },
		{ id: "downloads", text: getText("downloads") },
		{ id: "contact", text: getText("contact") }
	];
	useEffect(() => {
		setUserInfo(user);
		setDrawerState({
			...drawerState,
			open: false
		});
	}, [user]);
	const routeHandler = (oEvent) => {
		oEvent.preventDefault();
		const key = oEvent.target.getAttribute("data-key");
		switch (key) {
			case "logout":
				dispatch(signOut());
				break;
			case "aboutme":
			case "gallery":
			case "downloads":
			case "meeting":
			case "contact":
				navigate(key);
				break;
			default:
				navigate("/");
		}
	};
	return (
		<>
			<AppBar
				title={getText("title")}
				settings={[
					{ id: "dashboard", text: getText("dashboard") },
					{ id: "profile", text: getText("profile") },
					{ id: "logout", text: getText("logout") }
				]}
				click={routeHandler}
				userInfo={userInfo}
				register={(e) => {
					setDrawerState({
						...drawerState,
						open: true,
						contentProps: {
							type: constants.SIGNUP
						}
					});
				}}
				login={(e) => {
					setDrawerState({
						...drawerState,
						open: true,
						contentProps: {
							type: constants.SIGNIN
						}
					});
				}}
				pages={pages}
			/>
			<SwipeableEdgeDrawer initial={drawerState} />
		</>
	);
};

export default Header;
