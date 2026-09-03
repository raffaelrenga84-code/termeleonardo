import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";

/* Qui c'era un QueryClientProvider di react-query attorno all'app: nessun
   componente usava useQuery, e la libreria pesava 25 KB nel pacchetto.
   Tolto il 3 settembre 2026. */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
