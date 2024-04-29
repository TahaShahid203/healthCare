import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import DoctorDashboard from "./components/DoctorDashboard";
import PatientDashboard from "./components/PatientDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/register' element={<Signup />} />
					<Route path='/doctor/dashboard/' element={< DoctorDashboard/>} />
					<Route path='/patient/dashboard/' element={<PatientDashboard />} />
					
				</Routes>
			</BrowserRouter>
			<ToastContainer />
		</div>
	);
};

export default App;
