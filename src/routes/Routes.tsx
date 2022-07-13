import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
} from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import { Dashboard, Login, ViewCloths, AddCloth, UpdateCloth, ViewJewellerys, AddJewellery,UpdateJewellery , Categories} from "../Pages";

function Routes() {
    const loggedIn = true;

    const layouts = () => {
        return (
            <Router>
                <Layout>
                    <Switch>
                        <Route path="/" element={<Dashboard />} />
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
                <Route path="/login" element={<Login />} />
            </Switch>
        </Router>
        );
    };

    return (
        <>
            {
                loggedIn ? layouts() : authLayout()
            }
        </>
    );
}

export default Routes;
