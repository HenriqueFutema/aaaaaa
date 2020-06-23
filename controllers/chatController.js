const Chat = require("../models/Chat");

module.exports = {
  async store(req, res) {
    const { userId } = req;
    const { members } = req.body;

    const allMembers = [userId, ...members];

    const chat = await Chat.create({ members: allMembers });

    return res.json(chat);
  },

  async index(req, res) {
    const { userId } = req;

    let chats = await Chat.find({ members: userId }).populate(
      "members",
      "nickname"
    );

    chats = chats.map((chat) => ({
      ...chat._doc,
      lastMsg:
        chat._doc.messages[chat._doc.messages.length - 1] || "Mande um Oi",
      messages: [],
    }));

    return res.json(chats);
  },
};
