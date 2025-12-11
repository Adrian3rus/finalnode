import { generateToken } from "../services/auth.service.js";

export const login = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email y password son requeridos" });

    // Login de prueba
    if (email === "test@gmail.com" && password === "123456") {
      const user = { id: "123", email };
      const token = generateToken(user);

      return res.json({ message: "Login exitoso", token });
    }

    return res.status(401).json({ error: "Credenciales inválidas" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
