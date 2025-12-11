// products.routes.js
import { Router } from "express";
import { authentication } from "../middlewares/auth.middleware.js";
import { getAllProducts, getProductById, addProduct, editProduct, deleteProduct } from "../controllers/products.controller.js";

const router = Router();

router.use(authentication); // todas las rutas protegidas

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", addProduct);
router.put("/:id", editProduct);
router.delete("/:id", deleteProduct);

export default router;