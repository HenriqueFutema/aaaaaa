const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const { userId } = req;
    const { id } = req.params;

    const from = await User.findById(userId);
    const recieve = await User.findById(id);

    if (!recieve) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    if (from === recieve) {
      return res.status(400).json({ msg: "Não pode se seguir" });
    }

    if (from.following.includes(id)) {
      from.following.pull(id);
      recieve.followers.pull(userId);
    } else {
      from.following.push(id);
      recieve.followers.push(userId);
    }

    await from.save();
    await recieve.save();

    return res.json({
      from,
      recieve,
    });
  },

  async getFollowers(req, res) {
    const { id } = req.params;

    const followers = await User.findById(id)
      .select("followers")
      .populate("followers", "nickname");

    return res.json(followers);
  },

  async getFollowing(req, res) {
    const { id } = req.params;

    const following = await User.findById(id)
      .select("following")
      .populate("following", "nickname");

    return res.json(following);
  },
};
