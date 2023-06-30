import express from "express";
import handlebars from "express-handlebars";
//import { Server } from "socket.io";
import cookieParser from "cookie-parser";

import productsRouter from "../routes/products.routes.js";
import cartsRouter from "../routes/carts.routes.js";
import sessionsRouter from "../routes/sessions.routes.js";
import userRouter from "../routes/users.routes.js";
import roleRouter from "../routes/roles.routes.js";
import __dirname from "../../dirname.js";
import viewsRouter from "../routes/views.routes.js";
import ProductManager from "../../domain/managers/products.js";

import errorHandler from "../middlewares/errorHandler.js";

class AppExpress {
  init() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static("public"));
    this.app.use(cookieParser());
    this.app.use(errorHandler);
    this.app.engine("handlebars", handlebars.engine());
    this.app.set("view engine", "handlebars");
    this.app.set("views", __dirname + "/views");
  }

  build() {
    this.app.use("/", viewsRouter);
    this.app.use("/api/products", productsRouter);
    this.app.use("/api/carts", cartsRouter);
    this.app.use("/api/sessions", sessionsRouter);
    this.app.use("/api/users", userRouter);
    this.app.use("/api/roles", roleRouter);
  }

  listen() {
    return this.app.listen(process.env.NODE_PORT, () =>
      console.log("Escuchando...")
    );
  }
}

/*
const productManager = new ProductManager();

// <<< EL HTTPSERVER NO SE COMO UBICARLO >>>

const socketServer = new Server(httpServer);
socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("add", async (data) => {
    await productManager.addProduct(data);
    socket.emit("newList", await productManager.getProducts());
  });

  socket.on("delete", async (data) => {
    await productManager.deleteProduct(data);
    socket.emit("deleteProduct", await productManager.getProducts());
  });
});
*/

export default AppExpress;
