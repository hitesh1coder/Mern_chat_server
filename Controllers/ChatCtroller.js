const Chat = require("../Models/ChatModal"); // Assuming chatModel.js is in the same directory

const chatController = {};

// Create a new chat
chatController.createChat = async (req, res) => {
  try {
    const { members, isGroupChat, chatName } = req.body;
    const newChat = new Chat({ members, isGroupChat, chatName });
    await newChat.save();
    res.status(201).send(newChat);
  } catch (error) {
    res.status(400).send({ error: "Failed to create chat" });
  }
};

// Add a message to a chat
chatController.addMessage = async (req, res) => {
  try {
    const chatId = req.params.id;
    const { sender, content } = req.body;
    const newMessage = { sender, content };

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).send({ error: "Chat not found" });
    }

    chat.messages.push(newMessage);
    await chat.save();
    res.send(newMessage);
  } catch (error) {
    res.status(400).send({ error: "Failed to add message" });
  }
};

// Fetch chat details
chatController.getChat = async (req, res) => {
  try {
    const chatId = req.params.id;
    const chat = await Chat.findById(chatId).populate("members", "username");
    if (!chat) {
      return res.status(404).send({ error: "Chat not found" });
    }
    res.send(chat);
  } catch (error) {
    res.status(400).send({ error: "Failed to fetch chat details" });
  }
};

module.exports = chatController;
