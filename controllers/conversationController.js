const { StatusCodes } = require("http-status-codes");
const convoService = require("../services/conversationService");

const createConversation = async (req, res) => {
  const { dataMembers } = req.body;
  const user = req.user;
  // console.log(dataMembers);

  const members = [...dataMembers];
  // console.log(members, user.id);

  const data = await convoService.createNewConversation(members, user.id);
  // console.log(data);

  res.status(StatusCodes.OK).json({ msg: data });
};

const getUserConversations = async (req, res) => {
  const userId = req.user.id;
  const conversations = await convoService.getUserConversationsService(userId);
  res.status(StatusCodes.OK).json({ success: true, data: conversations });
};

const getConversationById = async (req, res) => {
  const { id } = req.params;
  const conversation = await convoService.getConversationByIdService(id);
  if (!conversation) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ success: false, msg: "Conversation not found" });
  }
  res.status(StatusCodes.OK).json({ success: true, data: conversation });
};

module.exports = {
  createConversation,
  getConversationById,
  getUserConversations,
};
