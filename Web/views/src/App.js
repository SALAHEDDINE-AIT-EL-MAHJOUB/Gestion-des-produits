import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import ProductView from "./ProductView";
import ProductListView from "./ProductListView";
import Navbar from "./Navbar";
import logo from './logo.svg';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div style={{ marginLeft: isHome ? 0 : "250px" }}>
      {!isHome && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductView />} />
        <Route path="/lists" element={<ProductListView />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
