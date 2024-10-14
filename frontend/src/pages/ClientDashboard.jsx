import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Chart } from "react-google-charts";
import "../styles/pages/_dashboard.scss";

const ClientDashboard = () => {
  // Initialiser userData avec un objet vide au lieu de null
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3001/api/client/user", // Remplacer par le bon endpoint
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.Role !== "client") {
          navigate("/client/dashboard"); // Redirige si l'utilisateur n'est pas un client
        } else {
          setUserData(response.data); // Assure-toi que `response.data` contient les bonnes données
        }
      } catch (error) {
        console.error("Error fetching user data", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  // Données pour le graphique
  const data = [
    ["VAISELLES", "Hours per Day"],
    ["VASE", 11],
    ["TASSES EN CÉRAMIQUE", 2],
    ["POT", 2],
    ["ASSIETTES", 2],
    ["AUTRES", 7],
  ];

  const options = {
    title: "Ventes KOS'",
    pieHole: 0.4,
    is3D: false,
  };

  // Afficher directement le formulaire même si les données utilisateur ne sont pas encore là
  return (
    <div className="dashboard-container mt-5">
      <h1>Client Dashboard</h1>
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">User Information</h5>
          <p className="card-text">
            <strong>Nom:</strong> {userData.Nom || "Chargement..."}
          </p>
          <p className="card-text">
            <strong>Email:</strong> {userData.Email || "Chargement..."}
          </p>
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">Ventes KOS'</h5>
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width="100%"
            height="400px"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
