const express = require("express");
const routes = express.Router();

const PostController = require("./controllers/postController");
const UserController = require("./controllers/userController");

const auth = require("./middlewares/auth");

routes.get("/posts", auth, PostController.index);
routes.post("/posts", auth, PostController.store);
routes.delete("/posts/:id", auth, PostController.destroy);
routes.put("/posts/:id", auth, PostController.update);

routes.post("/users", UserController.store);
routes.post("/auth", UserController.signIn);

module.exports = routes;
