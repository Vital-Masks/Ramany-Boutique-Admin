import path from "path";
import { element } from "prop-types";
import { useEffect, useState } from "react";
import { render } from "react-dom";
import { Routes as Switch, Route, Navigate, useNavigate } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import {
	Dashboard,
	ViewCloths,
	AddCloth,
	UpdateCloth,
	ViewJewellerys,
	AddJewellery,
	UpdateJewellery,
	Categories,
	Login,
	ViewOrders,
	ApproveOrder
} from "../Pages";



function Routes() {
	const [authToken, setAuthToken] = useState("");
	function setToken(userToken) {
		sessionStorage.setItem("token", JSON.stringify(userToken));
	}

	function getToken() {
		const tokenString: any = sessionStorage.getItem("token");
		setAuthToken(JSON.parse(tokenString));
	}
	// const token = getToken();
	// const navigate = useNavigate();

	useEffect(() => {
		getToken()
		if(!authToken){
			authLayout()

		}
		else{
			<Navigate to="/login" />
		}
	}, []);

	const layouts = () => {
		return (
			<Layout>
				<Switch>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/viewCloths" element={<ViewCloths />} />
					<Route path="/addCloth" element={<AddCloth />} />
					<Route path="/updateCloth" element={<UpdateCloth />} />
					<Route path="/viewJewellerys" element={<ViewJewellerys />} />
					<Route path="/addJewellery" element={<AddJewellery />} />
					<Route path="/updateJewellery" element={<UpdateJewellery />} />
					<Route path="/categories" element={<Categories />} />
					<Route path="/viewOrders" element={<ViewOrders />} />
					<Route path="/approveOrder" element={<ApproveOrder />} />
					{/* <Route path="/login" element={<Login setToken={setToken} />} /> */}
				</Switch>
			</Layout>
		);
	};

	const authLayout = () => {
		return (
			<Switch>
				<Route path="/" element={<Login setToken={setToken} />} />
			</Switch>
		);
	};

	return <>{authToken ?  layouts() : authLayout()}</>  ;
}

export default Routes;
