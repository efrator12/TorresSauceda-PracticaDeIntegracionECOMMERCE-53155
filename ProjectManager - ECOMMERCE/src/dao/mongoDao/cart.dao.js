import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";

const obtenerTodo = async () => {
  const carts = await cartModel.find();
  return carts;
};

const obtenerPorID = async (id) => {
  const cart = await cartModel.findById(id);
  return cart;
};

const crear = async (data) => {
  const newcart = await cartModel.create(data);
  return newcart;
};

const agregarProducto = async (cid, pid) => {
  try {
    const product = await productModel.findById(pid).catch((error) => {
      throw new Error(
        `El Producto con el ID: ${pid} no fue encontrado o ya fue eliminado`
      );
    });

    const cart = await cartModel.findById(cid).catch((error) => {
      throw new Error(
        `El Carrito con el ID: ${cid} no fue encontrado o ya fue eliminado`
      );
    });

    const productIndex = cart.products.findIndex(
      (p) => p._id.toString() === pid
    );
    if (productIndex > -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ _id: pid, quantity: 1 });
    }

    await cart.save();
    return cart;
  } catch (error) {
    throw Error(error.message);
  }
};

export default {
  obtenerTodo,
  obtenerPorID,
  crear,
  agregarProducto,
};
