import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBoxOpen, FaListUl, FaStore } from "react-icons/fa";

function Navbar() {
  const location = useLocation();

  // Ne pas afficher la Navbar sur la page d'accueil
  if (location.pathname === "/") {
    return null;
  }

  const navLinks = [
    { to: "/", label: "Accueil", icon: <FaHome /> },
    { to: "/products", label: "Produits", icon: <FaBoxOpen /> },
    { to: "/lists", label: "Listes", icon: <FaListUl /> },
  ];

  return (
    <nav
      style={{
        background: "#007bff",
        padding: "2rem 1rem",
        boxShadow: "2px 0 8px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        minHeight: "100vh",
        width: "250px",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}>
        <FaStore size={32} color="#fff" />
        <span style={{ fontWeight: "bold", color: "#fff", fontSize: "1.5rem", letterSpacing: "2px" }}>
          Gestion des Produits
        </span>
      </div>
      {/* Navigation Links */}
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          listStyle: "none",
          margin: 0,
          padding: 0,
          width: "100%",
        }}
      >
        {navLinks.map(link => (
          <li key={link.to} style={{ width: "100%" }}>
            <Link
              to={link.to}
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: "500",
                padding: "0.75rem 1rem",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: location.pathname === link.to ? "#FFD600" : "transparent",
                color: location.pathname === link.to ? "#333" : "#fff",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseOver={e => {
                if (location.pathname !== link.to) e.target.style.background = "#0056b3";
              }}
              onMouseOut={e => {
                if (location.pathname !== link.to) e.target.style.background = "transparent";
              }}
            >
              {link.icon} {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;