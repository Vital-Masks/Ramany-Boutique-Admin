import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../Components/Layout/Layout';
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
  ApproveOrder,
} from '../Pages';

function Router() {
  const [authToken, setAuthToken] = useState(null);

  function setToken(userToken) {
    setAuthToken(userToken);
    sessionStorage.setItem('token', JSON.stringify(userToken));
  }

  function getToken() {
    const tokenString: any = sessionStorage.getItem('token');
    if (tokenString) {
      console.log(tokenString);
      setAuthToken(JSON.parse(tokenString));
    }
  }

  useEffect(() => {
    getToken();
  }, []);

  return (
    <>
      <Layout auth={authToken ? true : false}>
        <Routes>
          {authToken && (
            <>
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
            </>
          )}
          {!authToken && (
            <Route path="/login" element={<Login setToken={setToken} />} />
          )}
          <Route
            path="*"
            element={<Navigate to={authToken ? '/dashboard' : '/login'} />}
          />
        </Routes>
      </Layout>
    </>
  );
}

export default Router;
