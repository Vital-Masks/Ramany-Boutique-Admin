import { Console } from 'console';
import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
} from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import { Dashboard, ViewCloths, AddCloth, UpdateCloth, ViewJewellerys, AddJewellery,UpdateJewellery , Categories, Login} from "../Pages";

function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
    const tokenString: any = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    
    if(userToken){
        return userToken
    }
    
    return userToken?.token

}


function Routes() {
    const token = getToken();

        const layouts = () => {
        return (
            <Router>
                <Layout>
                    <Switch>
                        {/* <Route path="/login" element={<Login />} /> */}
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/viewCloths" element={<ViewCloths />} />
                        <Route path="/addCloth" element={<AddCloth />} />
                        <Route path="/updateCloth" element={<UpdateCloth/>}/>
                        <Route path="/viewJewellerys" element={<ViewJewellerys />} />
                        <Route path="/addJewellery" element={<AddJewellery />} />
                        <Route path="/updateJewellery" element={<UpdateJewellery/>}/>
                        <Route path="/categories" element={<Categories/>}/>
                    </Switch>
                </Layout>
            </Router>
        );
    };

    const authLayout = () => {
        return(
        <Router>
            <Switch>
                <Route path="/login" element={<Login setToken={setToken}/>} />
            </Switch>
        </Router>
        );
    };

    return (
        <>
            {
                token ? layouts() : authLayout()
            }
        </>
    );
}

export default Routes;
