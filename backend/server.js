import express from "express";
import mysql from "mysql2/promise";
import produitRoutes from "../backend/routes/produitRoutes.js";
import multer from "multer";
import cookieParser from "cookie-parser";
import session from "express-session";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration de Multer
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
const port = 3000;

// Configuration de la connexion à MySQL
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

// Middleware de session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "votre_secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Configuration de EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("view options", { pretty: true });

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET || "votre_secret_jwt"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

// Utilisation des routes produitRoutes
app.use("/api", produitRoutes);
// Route pour la racine
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API des produits !");
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});

export { pool };
