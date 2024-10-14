import express from "express";
import multer from "multer";
import mysql from "mysql2/promise";
import produitRoutes from "./routes/produitRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
import Stripe from "stripe";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import cors from "cors";
import {
  authenticateToken,
  authorizeAdmin,
} from "./controllers/authMiddleware.js"; // Import des middlewares
import adminRoutes from "./routes/adminRoutes.js";

// Configuration des variables d'environnement
dotenv.config();

// Vérification des variables d'environnement importantes
if (
  !process.env.JWT_SECRET ||
  !process.env.DB_HOST ||
  !process.env.STRIPE_SECRET_KEY
) {
  throw new Error("Des variables d'environnement importantes sont manquantes.");
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialisation de Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 3000;

// Configuration de l'application
app.set("views", path.join(__dirname, "views"));
app.set("view options", { pretty: true });
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ limit: "10kb", extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET || "votre_secret_jwt"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(cors()); // Configuration CORS
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Utilisation des routes API
app.use("/api/produits", produitRoutes);
app.use("/api/auth", authRoutes);

// Route protégée par le middleware `authenticateToken` pour vérifier si l'utilisateur est admin
app.use("/api/admin", authenticateToken, authorizeAdmin, adminRoutes);

// Gestion des fichiers statiques pour le frontend (doit être après les routes API)
app.use(express.static(path.join(__dirname, "..", "frontend", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
});

// Route pour Stripe Checkout
app.post("/create-checkout-session", async (req, res) => {
  const { items } = req.body;

  const line_items = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100, // Convertit en centimes
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.json({ id: session.id });
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});

export { pool };
