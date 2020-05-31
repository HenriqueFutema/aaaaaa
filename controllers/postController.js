const Post = require("../models/Post");

module.exports = {
  async index(req, res) {
    let posts = await Post.find()
      .sort({ createdAt: "desc" })
      .populate("author", "nickname email")
      .populate("likes", "nickname");

    posts = posts.map((post) => ({
      ...post._doc,
      likesCount: post.likes.length,
    }));

    return res.json(posts);
  },

  async store(req, res) {
    const { content } = req.body;
    const { userId } = req;

    if (!content) {
      return res.json({ msg: "Ta trollando Porra" });
    }

    const post = await Post.create({ author: userId, content });

    await post.populate("author", "nickname email").execPopulate();

    return res.json(post);
  },

  async update(req, res) {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });

    await post.populate("author", "nickname email").execPopulate();

    return res.json(post);
  },

  async destroy(req, res) {
    const { id } = req.params;

    const post = await Post.findByIdAndDelete(id);

    return res.json({ msg: "Post deletado" });
  },
};
