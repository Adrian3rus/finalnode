import express from "express";
import cors from "cors";
import 'dotenv/config';

import authRoutes from "./src/routes/auth.routes.js";
import productRoutes from "./src/routes/products.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Ruta 404
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
