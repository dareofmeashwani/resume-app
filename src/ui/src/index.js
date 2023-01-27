import React from "react";
import ReactDOM from "react-dom";
import App from "./App";


import { Provider } from "react-redux";
import ReduxStore from "./store";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={ReduxStore()}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
