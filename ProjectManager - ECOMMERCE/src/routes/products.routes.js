import { Router, response } from "express";
import productDao from "../dao/mongoDao/product.dao.js";

const router = Router();

const getProduct = async (req, resp) => {
  try {
    // const { limit } = req.query;
    const products = await productDao.obtenerTodo();
    if (products.length > 0) {
      resp.status(200).json({ status: "success", payload: products });
    } else {
      throw new Error();
    }
  } catch (error) {
    resp
      .status(400)
      .json({ status: "error", response: "Sin productos en catalago" });
  }
};

const getByID = async (req, resp) => {
  try {
    const { pid } = req.params;
    const product = await productDao.obtenerPorID(pid);
    resp.status(200).json({ status: "success", response: product });
  } catch (error) {
    resp.status(404).json({ status: "error", error: error.message });
  }
};

const addProduct = async (req, resp) => {
  try {
    const product = req.body;
    const newProduct = await productDao.crear(product);
    if (typeof newProduct === "string") throw Error(newProduct);
    resp.status(201).json({ status: "success", response: newProduct });
  } catch (error) {
    resp.status(404).json({ status: "error", error: error.message });
  }
};

const updateProducts = async (req, resp) => {
  try {
    const { pid } = req.params;
    const product = req.body;
    await productDao.obtenerPorID(pid);
    const updateProduct = await productDao.actualizarPorID(pid, product);
    resp.status(201).json({ status: "success", response: updateProduct });
  } catch (error) {
    resp.status(404).json({ status: "error", error: error.message });
  }
};

const deleteProducts = async (req, resp) => {
  try {
    const { pid } = req.params;
    const resultadoEliminado = await productDao.eliminarPorID(pid);
    resp.status(201).json({
      status: "success",
      response: `Producto Eliminado con el ID: ${pid}`,
    });
  } catch (error) {
    resp.status(404).json({ status: "error", error: error.message });
  }
};

router.get("/", getProduct);
router.get("/:pid", getByID);
router.post("/", addProduct);
router.put("/:pid", updateProducts);
router.delete("/:pid", deleteProducts);

export default router;
