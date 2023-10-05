const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  messages: [
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  isGroupChat: {
    type: Boolean,
    default: false,
  },
  chatName: {
    // Only needed for group chats
    type: String,
    default: null,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
