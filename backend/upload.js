// upload.js
import multer from "multer";

// Configuration de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Export de 'upload' pour utilisation dans d'autres fichiers
export const upload = multer({ storage });
