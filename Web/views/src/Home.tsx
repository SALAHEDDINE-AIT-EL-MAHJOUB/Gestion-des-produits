// filepath: c:\Users\Sallaheddine\Desktop\Web\Web\views\src\Home.js
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale } from "chart.js";
import * as FaIcons from "react-icons/fa";
Chart.register(BarElement, CategoryScale, LinearScale);

const Home: React.FC = () => {
  const productCount = 12;
  const listCount = 5;

  // Responsive: détecte si mobile
  const isMobile = window.innerWidth < 768;

  const data = {
    labels: ["Produits", "Listes"],
    datasets: [
      {
        label: "Nombre",
        data: [productCount, listCount],
        backgroundColor: ["#27ae60", "#f1c40f"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true, precision: 0 },
    },
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Segoe UI, Arial, sans-serif",
        paddingLeft: isMobile ? 0 : 320, // Plus de padding à gauche sur mobile
        boxSizing: "border-box"
      }}
    >
      <div
        style={{
          maxWidth: isMobile ? "100%" : 1100, // Largeur max 100% sur mobile
          width: "100%",
          padding: isMobile ? "20px 5px" : "60px 48px", // Padding réduit sur mobile
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
          {FaIcons.FaBoxOpen({ size: 38, color: "#2980b9" })}
        </div>
        {/* Affichage des compteurs */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: 32,
          gap: isMobile ? 24 : 0
        }}>
          <div>
            <div style={{ fontSize: 32, color: "#27ae60", marginBottom: 8 }}>
              <FaIcons.FaBoxOpen />
            </div>
            <div style={{ fontWeight: 700, fontSize: 22 }}>{productCount}</div>
            <div style={{ color: "#2980b9", fontWeight: 500 }}>Produits</div>
          </div>
          <div>
            <div style={{ fontSize: 32, color: "#f1c40f", marginBottom: 8 }}>
              <FaIcons.FaListAlt />
            </div>
            <div style={{ fontWeight: 700, fontSize: 22 }}>{listCount}</div>
            <div style={{ color: "#f39c12", fontWeight: 500 }}>Listes</div>
          </div>
        </div>
        {/* Graphique */}
        <div style={{
          marginTop: 20,
          background: "#fff",
          borderRadius: 12,
          padding: isMobile ? 8 : 24,
          boxShadow: "0 2px 12px #eee"
        }}>
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default Home;