import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import GoogleFontLoader from "react-google-font-loader";
import Home from "./components/home";
import Contact from "./components/contact";
import Header from "./components/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Footer from "./components/Footer";
import Particle from "./components/controls/Particle";
import BusyIndicator from "./components/BusyIndicator";
import { useDispatch, useSelector } from "react-redux";
import { isAuthUser } from "./store/actions/userActions";
import Gallery from "./components/gallery";
import AboutMe from "./components/aboutMe";
import './styles/style.css';
import Meeting from "./components/meeting";
import ForgetPassword from "./components/ForgetPassword";
import EmailVerification from "./components/EmailVerification";
import Profile from "./components/profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
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
	const notifications = useSelector((state) => {
		return state.notificationData;
	});
	const user = useSelector((state) => {
		return state.userData.user;
	});
	React.useEffect(() => {
		if(!user){
			dispatch(isAuthUser());
		}
	}, [user])
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
			<Particle />
			<BusyIndicator />
			<ToastContainer />
			<BrowserRouter>
				<ThemeProvider theme={darkTheme}>
					<Header />
					<Routes >
						<Route path="" element={<Home />} />
						<Route path="home" element={<Home />} />
						<Route path="aboutMe" element={<AboutMe />} />
						<Route path="meeting" element={<Meeting />} />
						<Route path="gallery" element={<Gallery />} />
						<Route path="contact" element={<Contact />} />
						<Route path="profile" element={<Profile />} />
						<Route path="forgetPassword" element={<ForgetPassword />} />
						<Route path="emailVerification" element={<EmailVerification />} />
					</Routes>
					<Footer />
					<GoogleFontLoader
						fonts={[
							{ font: "Roboto", weights: [300, 400, 900] },
							{ font: "Fredoka One" },
							{ font: "Rubik Gemstones" }
						]}
					/>
				</ThemeProvider>
			</BrowserRouter>
		</>
	);
};
export default App;
