// backend/controllers/authController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  port: 8889,
  password: "root",
  database: "Kos",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Fonction utilitaire pour générer un token JWT
function generateToken(userData) {
  return jwt.sign(
    {
      id: userData.ID,
      email: userData.Email,
      role: userData.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}

// Route POST pour l'inscription d'un utilisateur
export const registerUser = async (req, res) => {
  const { Nom, Prenom, Email, Mot_de_passe, Adresse_de_livraison, role } =
    req.body;

  try {
    const connection = await pool.getConnection();

    // Vérification si l'utilisateur existe déjà
    const [existingUser] = await connection.query(
      "SELECT * FROM Users WHERE Email = ?",
      [Email]
    );

    if (existingUser.length > 0) {
      connection.release();
      return res.status(400).json({ message: "Cet utilisateur existe déjà." });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(Mot_de_passe, 10);

    // Insertion du nouvel utilisateur dans la base de données
    const [result] = await connection.query(
      "INSERT INTO Users (Nom, Prenom, Email, Mot_de_passe, Adresse_de_livraison, role) VALUES (?, ?, ?, ?, ?, ?)",
      [Nom, Prenom, Email, hashedPassword, Adresse_de_livraison, role]
    );

    connection.release();

    if (result.affectedRows === 1) {
      res.status(201).json({ message: "Inscription réussie." });
    } else {
      res.status(500).json({ message: "Erreur lors de l'inscription." });
    }
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'inscription.", error: error.message });
  }
};

// Route POST pour la connexion d'un utilisateur
export const loginUser = async (req, res) => {
  const { Email, Mot_de_passe } = req.body;

  try {
    const connection = await pool.getConnection();

    // Recherche de l'utilisateur dans la base de données
    const [results] = await connection.query(
      "SELECT * FROM Users WHERE Email = ?",
      [Email]
    );

    if (results.length === 0) {
      console.log("Utilisateur non trouvé :", Email);
      connection.release();
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const user = results[0];
    console.log("Utilisateur trouvé :", user);

    // Vérification du mot de passe
    const passwordMatch = await bcrypt.compare(Mot_de_passe, user.Mot_de_passe);

    if (!passwordMatch) {
      console.log("Mot de passe incorrect pour l'utilisateur :", Email);
      connection.release();
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    // Génération du token JWT
    const token = generateToken(user);
    console.log("Token généré pour l'utilisateur :", user);

    connection.release();
    res.status(200).json({ token });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la connexion.", error: error.message });
  }
};
