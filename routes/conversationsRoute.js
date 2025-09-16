const express = require("express");
const routes = express.Router();

const conversation = require("../controllers/conversationController");

routes
  .route("/")
  .post(conversation.createConversation)
  .get(conversation.getUserConversations);

routes.get("/:id", conversation.getConversationById);

module.exports = routes;
