import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/pages/_dashboard.scss";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    Nom: "",
    Description: "",
    Prix: "",
    Stock: "",
    Image: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3001/api/admin/user",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
        navigate("/login");
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/produits");
        setProducts(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    };

    fetchUserData();
    fetchProducts();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      Image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("Nom", formData.Nom);
    data.append("Description", formData.Description);
    data.append("Prix", formData.Prix);
    data.append("Stock", formData.Stock);
    data.append("Image", formData.Image);

    try {
      await axios.post("http://localhost:3001/api/produits", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Produit ajouté avec succès.");
      setFormData({
        Nom: "",
        Description: "",
        Prix: "",
        Stock: "",
        Image: null,
      });
      fetchProducts(); // Refresh product list
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error);
      alert("Erreur lors de l'ajout du produit.");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/produits/${id}`);
      setProducts(products.filter((product) => product.ID_produit !== id));
      alert("Produit supprimé avec succès.");
    } catch (error) {
      console.error("Erreur lors de la suppression du produit :", error);
      alert("Erreur lors de la suppression du produit.");
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];

  const options = {
    title: "My Daily Activities",
    pieHole: 0.4,
    is3D: false,
  };

  return (
    <div className="dashboard-container mt-5">
      <h1>Dashboard</h1>
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">User Information</h5>
          <p className="card-text">
            <strong>Name:</strong> {userData.Nom} {userData.Prenom}
          </p>
          <p className="card-text">
            <strong>Email:</strong> {userData.Email}
          </p>
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">Activity Chart</h5>
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width="100%"
            height="400px"
          />
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">Ajouter un Produit</h5>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nom</label>
              <input
                type="text"
                name="Nom"
                value={formData.Nom}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Prix</label>
              <input
                type="number"
                name="Prix"
                value={formData.Prix}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Stock</label>
              <input
                type="number"
                name="Stock"
                value={formData.Stock}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input
                type="file"
                name="Image"
                onChange={handleFileChange}
                required
              />
            </div>
            <button type="submit">Ajouter</button>
          </form>
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">Liste des Produits</h5>
          <ul>
            {products.map((product) => (
              <li key={product.ID_produit}>
                <img
                  src={`http://localhost:3001/Images/${product.Image}`}
                  alt={product.Nom}
                  style={{ width: "100px", height: "100px" }}
                />
                <h3>{product.Nom}</h3>
                <p>{product.Description}</p>
                <p>{product.Prix} €</p>
                <p>Stock: {product.Stock}</p>
                <button onClick={() => deleteProduct(product.ID_produit)}>
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
