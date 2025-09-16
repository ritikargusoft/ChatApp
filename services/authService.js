const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const repo = require("../repository/userRepo");

const registerUser = async (fullname, email, password) => {
  //find if user is already registered or not

  if (await repo.getUserByEmail(email)) {
    throw new Error("User already exists");
  }

  //Hashing Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return repo.createUser(fullname, email, hashedPassword);
};

const loginUser = async (email, password) => {
  const user = await repo.getUserByEmail(email);

  if (!user) {
    throw new Error("User does not exists");
  }
  const ok = await bcrypt.compare(password, user.password);

  if (!ok) {
    throw new Error("Password does not match");
  }

  const token = jwt.sign(
    { id: user.user_id, fullname: user.fullname, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  return { token: token, userId: user.user_id };
};

module.exports = { registerUser, loginUser };
