import React, { useEffect } from "react";
import AppBar from "./controls/AppBar";
import { useNavigate } from "react-router-dom";
import SignWorkflow from "./SignWorkflow";
import getText from "../messages";
import SwipeableEdgeDrawer from "./controls/Drawer";
import * as constants from "../utils/constants";
import { signOut } from "../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import EventBus from "./controls/EventBus";

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
		{ id: "meeting", text: getText("meeting") },
		{ id: "gallery", text: getText("gallery") },
		{ id: "contact", text: getText("contact") }
	];
	const userHeaderActions = [
		{ id: "Home", text: getText("Home") },
		{ id: "profile", text: getText("profile") },
		{ id: "logout", text: getText("logout") }
	];
	if(user && user.role === "ADMIN"){
		userHeaderActions.splice(1, 0, { id: "admin", text: getText("adminPanel") });
	}
	useEffect(() => {
		setUserInfo(user);
		setDrawerState({
			...drawerState,
			open: false
		});
	}, [user]);
	EventBus.on("launchSignUp",()=>{
		setDrawerState({
			...drawerState,
			open: true,
			contentProps: {
				type: constants.SIGNUP
			}
		});
	})
	EventBus.on("launchSignIn",()=>{
		setDrawerState({
			...drawerState,
			open: true,
			contentProps: {
				type: constants.SIGNIN
			}
		});
	})
	const routeHandler = (oEvent) => {
		oEvent.preventDefault();
		const key = oEvent.target.getAttribute("data-key");
		switch (key) {
			case "logout":
				dispatch(signOut()).then(()=>{
					navigate("/");
				});
				break;
			case "aboutme":
			case "gallery":
			case "meeting":
			case "contact":
			case "profile":
				navigate(key);
				break;
			default:
				navigate("/");
		}
	};
	return (
		<>
			<AppBar
				title={getText("domainName")}
				settings={userHeaderActions}
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
