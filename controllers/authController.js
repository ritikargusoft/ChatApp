const { StatusCodes } = require("http-status-codes");
const service = require("../services/authService");

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await service.loginUser(email, password);

  res.status(StatusCodes.OK).json(result);
};

const register = async (req, res) => {
  const { fullname, email, password } = req.body;

  const user = await service.registerUser(fullname, email, password);
  res.status(201).json(user);
};

module.exports = { login, register };
