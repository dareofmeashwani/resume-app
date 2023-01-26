import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
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
import Downloads from "./components/downloads";
import Gallery from "./components/gallery";
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
	return (
		<>
			<Particle />
			<BusyIndicator />
			<HashRouter>
				<ThemeProvider theme={darkTheme}>
					<Header />
					<MainLayout>
						<Routes>
							<Route path="" element={<Home />} />
							<Route path="home" element={<Home />} />
							<Route path="aboutMe" element={<Home />} />
							<Route path="meeting" element={<Home />} />
							<Route path="gallery" element={<Gallery />} />
							<Route path="downloads" element={<Downloads />} />
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
			</HashRouter>
		</>
	);
};
export default App;
