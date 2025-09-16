const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  //fetcing header for token verification
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res
      .status(StatusCodes.NETWORK_AUTHENTICATION_REQUIRED)
      .send("No token provided");
  }
  const token = authHeader;
  // (token);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // (payload);

    req.user = { id: payload.id };

    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).send("Not authenticated");
  }
};

module.exports = { authenticate };