import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Chart } from "react-google-charts";
import {
  addProduct,
  updateProduct,
  deleteProduct as deleteProductService,
} from "../services/productService";
import "../styles/pages/_dashboard.scss";

const AdminDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    Nom: "",
    Description: "",
    Prix: "",
    Stock: "",
    image: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState({});
  const navigate = useNavigate();

  // Fonction pour récupérer les produits
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/produits");
      setProducts(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits", error);
    }
  };

  // Fonction pour récupérer la liste des utilisateurs
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3001/api/admin/users",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(response.data);
      const rolesMap = response.data.reduce((acc, user) => {
        acc[user.ID_utilisateur] = user.Role;
        return acc;
      }, {});
      setRoles(rolesMap); // Met à jour les rôles pour chaque utilisateur
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs", error);
    }
  };

  // useEffect pour récupérer les données de l'utilisateur admin
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3001/api/admin/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Réponse API admin:", response.data);

        if (response.data.user && response.data.user.Role === "admin") {
          setUserData(response.data.user);
          fetchProducts(); // Récupérer les produits après la connexion
          fetchUsers(); // Récupérer les utilisateurs après la connexion
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("Nom", formData.Nom);
    data.append("Description", formData.Description);
    data.append("Prix", formData.Prix);
    data.append("Stock", formData.Stock);

    // Ajouter l'image uniquement si une nouvelle image a été sélectionnée
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      if (editMode) {
        await updateProduct(editProductId, data);
        alert("Produit mis à jour avec succès.");
        setEditMode(false);
        setEditProductId(null);
      } else {
        await addProduct(data);
        alert("Produit ajouté avec succès.");
      }

      setFormData({
        Nom: "",
        Description: "",
        Prix: "",
        Stock: "",
        image: null,
      });
      fetchProducts();
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout ou de la mise à jour du produit :",
        error
      );
      alert("Erreur lors de l'ajout ou de la mise à jour du produit.");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteProductService(id);
      setProducts(products.filter((product) => product.ID_produit !== id));
      alert("Produit supprimé avec succès.");
      fetchProducts();
    } catch (error) {
      console.error("Erreur lors de la suppression du produit :", error);
      alert("Erreur lors de la suppression du produit.");
    }
  };

  const editProduct = (product) => {
    setEditMode(true);
    setEditProductId(product.ID_produit);
    setFormData({
      Nom: product.Nom,
      Description: product.Description,
      Prix: product.Prix,
      Stock: product.Stock,
      image: null,
    });
  };

  // Gestion de la mise à jour du rôle de l'utilisateur
  const handleRoleChange = (userId, role) => {
    setRoles((prevRoles) => ({
      ...prevRoles,
      [userId]: role,
    }));
  };

  const updateRole = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3001/api/admin/users/${userId}`,
        { Role: roles[userId] },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Rôle mis à jour avec succès.");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du rôle", error);
      alert("Erreur lors de la mise à jour du rôle.");
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  const chartData = [
    ["VAISELLES", "Sales"],
    ["VASE", 11],
    ["TASSES EN CÉRAMIQUE", 2],
    ["POT", 2],
    ["ASSIETTES", 2],
    ["AUTRES", 7],
  ];

  const chartOptions = {
    title: "Ventes KOS'",
    pieHole: 0.4,
    is3D: false,
  };

  return (
    <div className="dashboard-container mt-5">
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Déconnexion</button>

      <div className="card-row">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">User Information</h5>
            <p className="card-text">
              <strong>Nom:</strong> {userData.Nom} {userData.Prenom}
            </p>
            <p className="card-text">
              <strong>Email:</strong> {userData.Email}
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Ventes KOS'</h5>
            <Chart
              chartType="PieChart"
              data={chartData}
              options={chartOptions}
              width="100%"
              height="400px"
            />
          </div>
        </div>
      </div>

      {/* Gestion des produits */}
      <div className="card-row">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              {editMode ? "Modifier le Produit" : "Ajouter un Produit"}
            </h5>
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
                <input type="file" name="image" onChange={handleFileChange} />
              </div>
              <button type="submit">
                {editMode ? "Mettre à jour" : "Ajouter"}
              </button>
            </form>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Liste des Produits</h5>
            <ul>
              {products.map((product) => (
                <li key={product.ID_produit}>
                  <img
                    src={`http://localhost:3001/images/${product.Image}`}
                    alt={product.Nom}
                    style={{ width: "100px", height: "100px" }}
                  />
                  <h3>{product.Nom}</h3>
                  <p>{product.Description}</p>
                  <p>{product.Prix} €</p>
                  <p>Stock: {product.Stock}</p>
                  <button onClick={() => editProduct(product)}>Modifier</button>
                  <button onClick={() => deleteProduct(product.ID_produit)}>
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Gestion des utilisateurs */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Liste des Utilisateurs</h5>
          <ul>
            {users.map((user) => (
              <li key={user.ID_utilisateur}>
                <h3>
                  {user.Nom} {user.Prenom}
                </h3>
                <p>Rôle actuel : {user.Role}</p>
                <div className="role-select">
                  <select
                    value={roles[user.ID_utilisateur]}
                    onChange={(e) =>
                      handleRoleChange(user.ID_utilisateur, e.target.value)
                    }
                  >
                    <option value="admin">Admin</option>
                    <option value="client">Client</option>
                  </select>
                  <button onClick={() => updateRole(user.ID_utilisateur)}>
                    Mettre à jour
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
