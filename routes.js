const express = require("express");
const routes = express.Router();

const PostController = require("./controllers/postController");
const UserController = require("./controllers/userController");
const LikeController = require("./controllers/likeController");
const FollowController = require("./controllers/followController");
const ChatController = require("./controllers/chatController");

const auth = require("./middlewares/auth");

routes.post("/users", UserController.store);
routes.post("/auth", UserController.signIn);

routes.use(auth);

routes.get("/posts", PostController.index);
routes.post("/posts", PostController.store);
routes.delete("/posts/:id", PostController.destroy);
routes.put("/posts/:id", PostController.update);

routes.post("/posts/likes/:id", LikeController.store);

routes.post("/follow/:id", FollowController.store);

routes.get("/users/:id/followers", FollowController.getFollowers);
routes.get("/users/:id/following", FollowController.getFollowing);

routes.post("/users/chats", ChatController.store);
routes.get("/users/chats", ChatController.index);

module.exports = routes;
