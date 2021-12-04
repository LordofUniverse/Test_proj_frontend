import "./App.css";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import Signup from "./Signup/signup";
import Login from "./Login/login";
import Subscription from "./Subscription/subscription";

const App = () => {
	const val = localStorage.getItem("gid");

	return (
		<Router>
			<Routes>
				<Route exact path="/signup" element={<Signup />}></Route>

				<Route exact path="/login" element={<Login />}></Route>

				<Route
					exact
					path="/"
					element={
						val === null ? (
							<Navigate to="/login" />
						) : (
							<Subscription />
						)
					}
				></Route>
			</Routes>
		</Router>
	);
};

export default App;
