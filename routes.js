const express = require("express");
const routes = express.Router();

const PostController = require("./controllers/postController");
const UserController = require("./controllers/userController");

const auth = require("./middlewares/auth");

routes.get("/posts", PostController.index);
routes.post("/posts", PostController.store);
routes.delete("/posts/:id", PostController.destroy);
routes.put("/posts/:id", PostController.update);

routes.post("/users", UserController.store);
routes.post("/auth", UserController.signIn);

module.exports = routes;
