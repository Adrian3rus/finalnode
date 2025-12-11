import express from "express";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import { db } from "./src/data/firebase.js";
import { collection, getDocs } from "firebase/firestore";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET_KEY || "supersecretkey";

// --- Middleware para rutas protegidas ---
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "Token no proporcionado" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Formato de token inválido" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Token inválido o expirado" });
    req.user = decoded;
    next();
  });
};

// --- Endpoint de login de prueba ---
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ error: "Email y password requeridos" });

  // Login de prueba
  if (email === "test@gmail.com" && password === "123456") {
    const user = { id: "123", email };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ message: "Login exitoso", token });
  }

  return res.status(401).json({ error: "Credenciales inválidas" });
});

// --- Endpoint protegido para productos ---
app.get("/products", authMiddleware, async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, "products"));
    const productos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(productos);
  } catch (error) {
    console.error("Error al leer Firestore:", error);
    res.status(500).json({ error: "No se pudo conectar con Firestore" });
  }
});

// --- Test simple de servidor ---
app.get("/", (req, res) => {
  res.json({ message: "Servidor funcionando" });
});

// --- Levantar servidor ---
app.listen(PORT, () => {
  console.log(`Servidor de prueba corriendo en http://localhost:${PORT}`);
});
