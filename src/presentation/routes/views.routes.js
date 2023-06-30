import express from "express";
import ProductManager from "../../domain/managers/products.js";

const router = express.Router();
const productManager = new ProductManager();

//router.get('/',(req,res) => {
//    res.render('../views/layouts/index.handlebars',{});
//})

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();

  const objetoParaHandlebars = {
    elementos: products,
  };
  res.render("home", objetoParaHandlebars);
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();
  const objetoParaHandlebars = {
    elementos: products,
  };

  res.render("realTimeProducts", objetoParaHandlebars);
});

export default router;
