import {
    BrowserRouter as Router,
    Routes as Switch,
    Route,
} from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import { Dashboard, Login, Product } from "../Pages";

function Routes() {
    const loggedIn = true;

    const layouts = () => {
        return (
            <Router>
                <Layout>
                    <Switch>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/product" element={<Product />} />
                    </Switch>
                </Layout>
            </Router>
        );
    };

    const authLayout = () => {
        <Router>
            <Switch>
                <Route path="/login" element={<Login />} />
            </Switch>
        </Router>;
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
