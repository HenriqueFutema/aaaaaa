const Post = require("../models/Post");

module.exports = {
  async index(req, res) {
    const posts = await Post.find().sort({ createdAt: "desc" });

    return res.json(posts);
  },

  async store(req, res) {
    const { author, content } = req.body;

    if (!author || !content) {
      return res.json({ msg: "Ta trollando Porra" });
    }

    const post = await Post.create(req.body);
    return res.json(post);
  },

  async update(req, res) {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });

    return res.json(post);
  },

  async destroy(req, res) {
    const { id } = req.params;

    const post = await Post.findByIdAndDelete(id);

    return res.json({ msg: "Post deletado" });
  },
};
