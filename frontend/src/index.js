import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
//import "./index.css"; // Assurez-vous d'avoir un fichier CSS ou modifiez-le si vous n'en avez pas besoin

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
