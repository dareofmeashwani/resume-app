import React from "react";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import BusyIndicator from "../components/BusyIndicator";

const MainLayout = (props) => {
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
			<Container style={{marginBottom: "10%"}}>{props.children}</Container>
			<ToastContainer />
			<BusyIndicator />
		</>
	);
};

export default MainLayout;
