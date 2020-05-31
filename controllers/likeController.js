const Post = require("../models/Post");

module.exports = {
  async store(req, res) {
    const { id } = req.params;
    const { userId } = req;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ msg: "Post não encontrado" });
    }

    if (post.likes.includes(userId)) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    return res.json({
      likesCount: post.likes.length,
      hasLiked: post.likes.includes(userId),
    });
  },
};
