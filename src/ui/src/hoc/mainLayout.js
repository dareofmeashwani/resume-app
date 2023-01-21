import React from "react";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { isAuthUser } from "../store/actions/user_actions";
import particlesConfig from "./particlesConfig";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import BusyIndicator from "../components/BusyIndicator";

const particlesInit = (engine) => {
	loadFull(engine);
};

const MainLayout = (props) => {
	const dispatch = useDispatch();
	dispatch(isAuthUser());
	const notifications = useSelector((state) => {
		return state.notificationData;
	});
	React.useEffect(() => {
		if (Object.keys(notifications).length === 0) {
			toast.dismiss();
			return;
		}
		const type = notifications.type;
		const title = notifications.title || notifications.message;
		const position = notifications.position || toast.POSITION.BOTTOM_LEFT;
		toast[type](title, {
			position
		});
	}, [notifications]);

	return (
		<>
			<Container>
				{props.children}
			</Container>
			<ToastContainer />
			<BusyIndicator/>
			<Particles init={particlesInit} options={particlesConfig} />
		</>
	);
};

export default MainLayout;
