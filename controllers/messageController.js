const { StatusCodes } = require("http-status-codes");
const service = require("../services/messageService");
const { io } = require("../socket");


const createMessage = async (req, res) => {
  // const { message_content } = req.body;
  // let conversation_id = req.params.conversationId;
  // const convId = conversation_id.conversationId;
  // const sender_id = req.user.id;

  // const message = await service.createMessageService({
  //   message_content,
  //   conversation_id,
  //   sender_id,
  // });
  // io.to(conversation_id).emit("Message created", message);
  // res.status(StatusCodes.CREATED).json({ success: true, data: message });
};

const getMessagesByConversationId = async (req, res) => {
  const { conversationId } = req.params;
  const messages = await service.getMessagesByConversationIdService(
    conversationId
  );
  res.status(StatusCodes.OK).json({ success: true, data: messages });
};

const updateMessage = async (req, res) => {
  const { id } = req.params;
  const updated = await service.updateMessageService(id);
  res.status(StatusCodes.OK).json({ success: true, data: updated });
};

const deleteMessage = async (req, res) => {
  const { id } = req.params;
  const deleted = await service.deleteMessageService(id);
  res.status(StatusCodes.OK).json({ success: true, data: deleted });
};

module.exports = {
  createMessage,
  getMessagesByConversationId,
  updateMessage,
  deleteMessage,
};
