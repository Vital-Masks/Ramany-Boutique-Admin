import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Login from './Components/User/Login';
import Product from './Components/Product/Product';

function App() {
  return (
    <Router>      
        <Routes>
          <Route path="/dashboard" element={<Layout/>}/> 
          <Route path="/product" element={<Product/>}/> 
          <Route path="/login" element={<Login/>}/> 
         </Routes>
    </Router>
  );
}

export default App;
