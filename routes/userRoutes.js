const express = require("express");
const routes = express.Router();

const user = require("../controllers/userController");

routes.get(`/`, user.getUsers);

module.exports = routes;
