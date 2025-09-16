const repo = require("../repository/messageRepo");

async function createMessageService({
  conversation_id,
  sender_id,
  message_content,
}) {
  return await repo.createMessage({
    conversation_id,
    sender_id,
    message_content,
  });
}
async function getMessagesByConversationIdService(conversation_id) {
  return await repo.getMessagesByConversationId(conversation_id);
}

async function updateMessageService(message_id) {
  return await repo.updateMessage(message_id);
}
async function deleteMessageService(message_id) {
  return await repo.deletMessage(message_id);
}
module.exports = {
  createMessageService,
  getMessagesByConversationIdService,
  updateMessageService,
  deleteMessageService,
};
