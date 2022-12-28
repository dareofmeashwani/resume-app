import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import GoogleFontLoader from "react-google-font-loader";
import MainLayout from "./hoc/mainLayout";
import Home from "./components/home";
import Header from "./components/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#1976d2"
		}
	}
});

const app = () => {
	console.log("app");
	return (
		<BrowserRouter>
			<ThemeProvider theme={darkTheme}>
				<MainLayout>
					<Header />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/home" element={<Home />} />
						<Route path="/aboutMe" element={<Home />} />
						<Route path="/meeting" element={<Home />} />
						<Route path="/gallery" element={<Home />} />
						<Route path="/download" element={<Home />} />
						<Route path="/contact" element={<Home />} />
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
		</BrowserRouter>
	);
};
export default app;
