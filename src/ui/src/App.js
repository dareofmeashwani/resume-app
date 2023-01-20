import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import GoogleFontLoader from "react-google-font-loader";
import MainLayout from "./hoc/mainLayout";
import Home from "./components/sections/home";
import Contact from "./components/sections/contact";
import Header from "./components/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { isAuthUser } from "./store/actions/user_actions";
import particlesConfig from "./particlesConfig";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#1976d2"
		}
	}
});

const App = () => {
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
	const particlesInit = (engine) => {
		loadFull(engine);
	};
	return (
		<div>
			<Particles init={particlesInit} options={particlesConfig} />
			<HashRouter>
				<ThemeProvider theme={darkTheme}>
					<MainLayout>
						<Header />
						<Routes>
							<Route path="" element={<Home />} />
							<Route path="home" element={<Home />} />
							<Route path="aboutMe" element={<Home />} />
							<Route path="meeting" element={<Home />} />
							<Route path="gallery" element={<Home />} />
							<Route path="downloads" element={<Home />} />
							<Route path="contact" element={<Contact />} />
						</Routes>

						<GoogleFontLoader
							fonts={[
								{ font: "Roboto", weights: [300, 400, 900] },
								{ font: "Fredoka One" },
								{ font: "Rubik Gemstones" }
							]}
						/>
					</MainLayout>
				</ThemeProvider>
				<ToastContainer />
			</HashRouter>
		</div>
	);
};
export default App;
