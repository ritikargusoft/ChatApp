const conversationRepo = require("../repository/conversationRepo")
const conversationMembersRepo = require("../repository/conversationMembersRepo")

const createNewConversation = async (members, id) =>{
    const conversationId = await conversationRepo.createConversation(id);

    members = [...members, id];
    members = members.map(Number);

    const addConversationMember = await conversationMembersRepo.addConversationUser(conversationId,members);

    return addConversationMember;
}

async function getUserConversationsService(userId) {
    return await conversationRepo.getConversationByUserId(userId);
}

async function getConversationByIdService(params) {
    return await conversationRepo.getConversationById(id);
}

module.exports ={
    createNewConversation,
    getUserConversationsService,
    getConversationByIdService
}