const express = require("express");
const routes = express.Router();

const PostController = require("./controllers/postController");
const UserController = require("./controllers/userController");
const LikeController = require("./controllers/likeController");
const FollowController = require("./controllers/followController");

const auth = require("./middlewares/auth");

routes.post("/users", UserController.store);
routes.post("/auth", UserController.signIn);

routes.get("/posts", auth, PostController.index);
routes.post("/posts", auth, PostController.store);
routes.delete("/posts/:id", auth, PostController.destroy);
routes.put("/posts/:id", auth, PostController.update);

routes.post("/posts/likes/:id", auth, LikeController.store);

routes.post("/follow/:id", auth, FollowController.store);

routes.get("/users/:id/followers", auth, FollowController.getFollowers);
routes.get("/users/:id/following", auth, FollowController.getFollowing);

module.exports = routes;
