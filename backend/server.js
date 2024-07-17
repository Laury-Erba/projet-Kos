// server.js
import express from "express";
import mysql from "mysql2/promise";
import produitRoutes from "./routes/produitRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import multer from "multer";
import cookieParser from "cookie-parser";
import session from "express-session";
import bodyParser from "body-parser"; // Assurez-vous que c'est importé une seule fois
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const app = express();
const port = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view options", { pretty: true });
//pour l'utilisation du json à la réception des données formulaire
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.COOKIE_SECRET || "votre_secret_jwt"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

// Configure CORS
app.use(cors());

// Utiliser les routes API
app.use("/api/produits", produitRoutes);
app.use("/auth", authRoutes);

// Ajouter cette ligne pour servir les fichiers statiques du build React
app.use(express.static(path.join(__dirname, "..", "frontend", "build")));

// Pour toutes les autres routes, servir index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});

export { pool };
