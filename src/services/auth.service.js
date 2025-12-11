import jwt from "jsonwebtoken";
import 'dotenv/config';

const secret_key = process.env.JWT_SECRET_KEY;

export const generateToken = (user) => {
  const payload = { id: user.id, email: user.email };
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, secret_key, options);
};
