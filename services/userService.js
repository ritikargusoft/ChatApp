const user = require("../repository/userRepo");

const getAllUserService = async () => {
  const users = await user.getAllUser();
  users;

  return users;
};

module.exports = { getAllUserService };
