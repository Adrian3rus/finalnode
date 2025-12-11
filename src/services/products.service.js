import * as productModel from "../models/products.model.js";

export const getAllProductsService = () => productModel.obtenerProductos();
export const getProductByIdService = (id) => productModel.obtenerProducto(id);
export const addProductService = (product) => productModel.agregarProducto(product);
export const editProductService = (id, product) => productModel.actualizarProducto(id, product);
export const deleteProductService = (id) => productModel.eliminarProducto(id);
