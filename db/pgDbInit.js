const { createConversationTable } = require("../repository/conversationRepo");

const {
  createConversationUserTable,
} = require("../repository/conversationMembersRepo");

const { createMessageTable } = require("../repository/messageRepo");

const { createUserTable } = require("../repository/userRepo");

const createTables = async () => {
  createConversationTable();

  createConversationUserTable();

  createMessageTable();
  createUserTable();

  console.log("Tables Created");
};

module.exports = createTables;
