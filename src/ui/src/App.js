import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import GoogleFontLoader from "react-google-font-loader";
import MainLayout from "./hoc/mainLayout";
import Home from "./components/home";
import Contact from "./components/contact";
import Header from "./components/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Footer from "./components/Footer";
import Particle from "./components/controls/Particle";
import BusyIndicator from "./components/BusyIndicator";
import { useDispatch } from "react-redux";
import { isAuthUser } from "./store/actions/userActions";
import Gallery from "./components/gallery";
import AboutMe from "./components/aboutMe";
import './styles/style.css';
import Meeting from "./components/meeting";
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
	React.useEffect(() => {
		dispatch(isAuthUser());
	}, [])
	return (
		<>
			<Particle />
			<BusyIndicator />
			<BrowserRouter>
				<ThemeProvider theme={darkTheme}>
					<Header />
					<MainLayout>
						<Routes >
							<Route path="" element={<Home />} />
							<Route path="home" element={<Home />} />
							<Route path="aboutMe" element={<AboutMe />} />
							<Route path="meeting" element={<Meeting />} />
							<Route path="gallery" element={<Gallery />} />
							<Route path="contact" element={<Contact />} />
						</Routes>
					</MainLayout>
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
