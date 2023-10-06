const express = require("express");
const chatController = require("../Controllers/ChatCtroller.js");

const router = express.Router();

router.post("/chats", chatController.createChat);
router.post("/chats/:id/messages", chatController.addMessage);
router.get("/chats/:id", chatController.getChat);

module.exports = router;
