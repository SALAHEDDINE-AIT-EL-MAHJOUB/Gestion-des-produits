import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import ProductView from "./ProductView";
import ProductListView from "./ProductListView";
import Navbar from "./Navbar";

import './App.css';

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isMobile = window.innerWidth < 768;

  return (
    <div style={{ marginLeft: !isHome && !isMobile ? "250px" : 0 }}>
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
