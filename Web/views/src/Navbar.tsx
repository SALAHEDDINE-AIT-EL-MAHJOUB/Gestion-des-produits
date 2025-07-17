import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import * as FaIcons from "react-icons/fa";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState<boolean>(false);

  // Ne pas afficher la Navbar sur la page d'accueil
  if (location.pathname === "/") {
    return null;
  }

  const navLinks = [
    { to: "/", label: "Accueil", icon: FaIcons.FaHome },
    { to: "/products", label: "Produits", icon: FaIcons.FaBoxOpen },
    { to: "/lists", label: "Listes", icon: FaIcons.FaListUl },
  ];

  // Styles pour le responsive
  const navStyle: React.CSSProperties = {
    background: "#007bff",
    padding: "2rem 1rem",
    boxShadow: "2px 0 8px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    minHeight: "100vh",
    width: "320px", // élargi ici
    position: "fixed",
    left: 0,
    top: 0,
    zIndex: 100,
  };

  const burgerStyle: React.CSSProperties = {
    position: "fixed",
    top: "1rem",
    left: "1rem",
    zIndex: 200,
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    cursor: "pointer",
  };

  const popupStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "320px", // élargi ici aussi
    height: "100vh",
    background: "#007bff",
    boxShadow: "2px 0 8px rgba(0,0,0,0.08)",
    zIndex: 300,
    display: "flex",
    flexDirection: "column",
    padding: "2rem 1rem",
    animation: "slideIn 0.3s",
  };

  // Media query JS pour mobile
  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    return (
      <>
        {/* Barre du haut avec burger et titre */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "64px",
            background: "#007bff",
            display: "flex",
            alignItems: "center",
            padding: "0 1rem",
            zIndex: 201,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <button style={{ ...burgerStyle, position: "static", marginRight: "1rem" }} onClick={() => setOpen(true)}>
            {FaIcons.FaBars({})}
          </button>
          {FaIcons.FaStore({ size: 32, color: "#fff" })}
          <span style={{ fontWeight: "bold", color: "#fff", fontSize: "1.3rem", letterSpacing: "2px" }}>
            Gestion des Produits
          </span>
        </div>
        {/* Popup latérale */}
        {open && (
          <div style={popupStyle}>
            <button
              style={{ ...burgerStyle, left: "200px", background: "transparent", color: "#fff", boxShadow: "none" }}
              onClick={() => setOpen(false)}
            >
              {FaIcons.FaTimes({})}
            </button>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                listStyle: "none",
                margin: "4rem 0 0 0",
                padding: 0,
                width: "100%",
              }}
            >
              {navLinks.map(link => (
                <li key={link.to} style={{ width: "100%" }}>
                  <Link
                    to={link.to}
                    style={{
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
                    onClick={() => setOpen(false)}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {link.icon({ size: 20 })}
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Décale le contenu principal vers le bas */}
        <div style={{ height: "64px" }} />
      </>
    );
  }

  // Desktop version
  return (
    <nav style={navStyle}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}>
        {FaIcons.FaStore({ size: 32, color: "#fff" })}
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
                transition: "background 0.2s, color 0.2s",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {link.icon({ size: 20 })}
                {link.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;