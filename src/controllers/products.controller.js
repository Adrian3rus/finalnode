import * as productService from "../services/products.service.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProductsService();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductByIdService(req.params.id);
    if (!product) return res.status(404).json({ error: "Producto no encontrado" });
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener producto" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const newProduct = await productService.addProductService(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear producto" });
  }
};

export const editProduct = async (req, res) => {
  try {
    const updated = await productService.editProductService(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar producto" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProductService(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
};
