import mysql from "mysql2/promise";
import { pool } from "../server.js";

// Récupérer tous les produits
export const getProducts = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM Produits");
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits : ", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des produits.",
    });
  }
};

// Récupérer un produit par ID
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM Produits WHERE ID_produit = ?",
      [id]
    );
    connection.release();
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "Produit non trouvé." });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du produit : ", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération du produit.",
    });
  }
};

// Ajouter un produit
export const addProduct = async (req, res) => {
  const { Nom, Description, Prix, Stock } = req.body;
  const image = req.file ? req.file.filename : null; // Assure-toi que l'image est récupérée correctement
  try {
    const connection = await pool.getConnection();
    await connection.query(
      "INSERT INTO Produits (Nom, Description, Prix, Image, Stock) VALUES (?, ?, ?, ?, ?)", // Ici "Image" avec majuscule
      [Nom, Description, Prix, image, Stock] // Utilise "image" pour lier au fichier
    );
    connection.release();
    res.status(201).json({ message: "Produit ajouté avec succès." });
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit : ", error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de l'ajout du produit." });
  }
  console.log("Image uploadée :", image);
};

// Mettre à jour un produit
// Mettre à jour un produit
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { Nom, Description, Prix, Stock } = req.body;

  // Vérifier si une nouvelle image a été uploadée
  const image = req.file ? req.file.filename : null;

  try {
    const connection = await pool.getConnection();

    // Si aucune nouvelle image n'est uploadée, conserver l'image existante
    let query;
    let queryParams;

    if (image) {
      query =
        "UPDATE Produits SET Nom = ?, Description = ?, Prix = ?, Image = ?, Stock = ? WHERE ID_produit = ?";
      queryParams = [Nom, Description, Prix, image, Stock, id];
    } else {
      query =
        "UPDATE Produits SET Nom = ?, Description = ?, Prix = ?, Stock = ? WHERE ID_produit = ?";
      queryParams = [Nom, Description, Prix, Stock, id];
    }

    await connection.query(query, queryParams);
    connection.release();

    res.status(200).json({ message: "Produit mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit : ", error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la mise à jour du produit." });
  }
};

// Supprimer un produit
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await pool.getConnection();
    await connection.query("DELETE FROM Produits WHERE ID_produit = ?", [id]);
    connection.release();
    res.status(200).json({ message: "Produit supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression du produit : ", error);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la suppression du produit." });
  }
};
