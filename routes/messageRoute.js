const express = require("express");
const router = express.Router();
const messages = require("../controllers/messageController");
// CREATE message
router.post("/:conversationId", messages.createMessage);
// READ all messages in a conversation
router.get("/:conversationId", messages.getMessagesByConversationId);

// UPDATE message
router.put("/:id", messages.updateMessage);
// DELETE message
router.delete("/:id", messages.deleteMessage);
module.exports = router;
