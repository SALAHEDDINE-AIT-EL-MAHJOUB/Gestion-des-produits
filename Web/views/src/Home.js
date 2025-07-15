// filepath: c:\Users\Sallaheddine\Desktop\Web\Web\views\src\Home.js
import React from "react";
import { Link } from "react-router-dom";
import { FaBoxOpen, FaListAlt } from "react-icons/fa";

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #2980b9 0%, #27ae60 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Segoe UI, Arial, sans-serif"
      }}
    >
      <div
        style={{
          maxWidth: 420,
          width: "100%",
          padding: "40px 32px",
          borderRadius: "18px",
          boxShadow: "0 8px 32px rgba(44,62,80,0.18)",
          background: "#fff",
          textAlign: "center",
          position: "relative"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-32px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#fff",
            borderRadius: "50%",
            boxShadow: "0 2px 8px rgba(44,62,80,0.10)",
            padding: "12px"
          }}
        >
          <FaBoxOpen size={38} color="#2980b9" />
        </div>
        <h2 style={{ color: "#2980b9", marginBottom: "36px", marginTop: "24px", fontWeight: 700, fontSize: "2rem" }}>
          Bienvenue !
        </h2>
        <nav>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "22px" }}>
              <Link
                to="/products"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "linear-gradient(90deg, #27ae60 60%, #2ecc71 100%)",
                  color: "#fff",
                  padding: "14px 38px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "19px",
                  fontWeight: "600",
                  boxShadow: "0 2px 12px rgba(39,174,96,0.10)",
                  transition: "transform 0.18s, box-shadow 0.18s"
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 4px 18px rgba(39,174,96,0.18)";
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 2px 12px rgba(39,174,96,0.10)";
                }}
              >
                <FaBoxOpen size={24} />
                Produits
              </Link>
            </li>
            <li>
              <Link
                to="/lists"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "linear-gradient(90deg, #f1c40f 60%, #f39c12 100%)",
                  color: "#fff",
                  padding: "14px 38px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "19px",
                  fontWeight: "600",
                  boxShadow: "0 2px 12px rgba(241,196,15,0.10)",
                  transition: "transform 0.18s, box-shadow 0.18s"
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 4px 18px rgba(241,196,15,0.18)";
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 2px 12px rgba(241,196,15,0.10)";
                }}
              >
                <FaListAlt size={24} />
                Listes de produits
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Home;