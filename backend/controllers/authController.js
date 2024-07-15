import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";

// Connexion à la base de données
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
      id: userData.ID_client || userData.ID_admin,
      email: userData.Email || userData.Nom_utilisateur,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}

// Route POST pour l'inscription d'un client
export const registerClient = async (req, res) => {
  const { Nom, Prenom, Email, Mot_de_passe, Adresse_de_livraison } = req.body;

  try {
    const connection = await pool.getConnection();

    // Vérification si l'utilisateur existe déjà
    const [existingUser] = await connection.query(
      "SELECT * FROM clients WHERE Email = ?",
      [Email]
    );

    if (existingUser.length > 0) {
      connection.release();
      return res.status(400).json({ message: "Cet utilisateur existe déjà." });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(Mot_de_passe, 10);

    // Insertion du nouvel utilisateur dans la base de données
    await connection.query(
      "INSERT INTO clients (Nom, Prenom, Email, Mot_de_passe, Adresse_de_livraison) VALUES (?, ?, ?, ?, ?)",
      [Nom, Prenom, Email, hashedPassword, Adresse_de_livraison]
    );

    connection.release();
    res.status(201).json({ message: "Inscription réussie." });
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ message: "Erreur lors de l'inscription." });
  }
};

// Route POST pour la connexion d'un client
export const loginClient = async (req, res) => {
  const { Email, Mot_de_passe } = req.body;

  try {
    const connection = await pool.getConnection();

    // Recherche de l'utilisateur dans la base de données
    const [results] = await connection.query(
      "SELECT * FROM clients WHERE Email = ?",
      [Email]
    );

    if (results.length === 0) {
      connection.release();
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const user = results[0];

    // Vérification du mot de passe
    const passwordMatch = await bcrypt.compare(Mot_de_passe, user.Mot_de_passe);

    if (!passwordMatch) {
      connection.release();
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    // Génération du token JWT
    const token = generateToken(user);

    connection.release();
    res.status(200).json({ token });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur lors de la connexion." });
  }
};

// Route POST pour la connexion d'un admin
export const loginAdmin = async (req, res) => {
  const { Nom_utilisateur, Mot_de_passe } = req.body;

  try {
    const connection = await pool.getConnection();

    // Recherche de l'admin dans la base de données
    const [results] = await connection.query(
      "SELECT * FROM admin WHERE Nom_utilisateur = ?",
      [Nom_utilisateur]
    );

    if (results.length === 0) {
      connection.release();
      return res.status(404).json({ message: "Admin non trouvé." });
    }

    const admin = results[0];

    // Vérification du mot de passe
    const passwordMatch = await bcrypt.compare(
      Mot_de_passe,
      admin.Mot_de_passe
    );

    if (!passwordMatch) {
      connection.release();
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    // Génération du token JWT
    const token = generateToken(admin);

    connection.release();
    res.status(200).json({ token });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur lors de la connexion." });
  }
};
