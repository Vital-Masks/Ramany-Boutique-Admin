import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
} from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import { Dashboard, Login, ViewProducts, AddProduct } from "../Pages";

function Routes() {
    const loggedIn = true;

    const layouts = () => {
        return (
            <Router>
                <Layout>
                    <Switch>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/viewProducts" element={<ViewProducts />} />
                        <Route path="/addProduct" element={<AddProduct />} />
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
