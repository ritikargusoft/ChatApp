require("dotenv").config();
const express = require("express");
const initDb = require("./db/init");
// const http = require("http");
// const socketIo = require("socket.io");
// const cors = require("cors");
// const helmet = require("helmet");
// const rateLimit = require("express-rate-limit");

// const authRoute = require("./routes/auth");
// const chatRoute = require("./routes/chat");
// const userRoute = require("./routes/users");

// const { authenticate } = require("./middleware/auth");
// const errorHandler = require("./middleware/errorHandler");
// const socketService = require("./services/socketService");

const app = express();

async function initializeDatabase() {
  try {
    await initDb();
    console.log("Database and tables initialized successfully.");
  } catch (err) {
    console.error("Error during database initialization:", err);
  }
}
initializeDatabase();

// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: process.env.CLIENT_URL || "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// // Security middleware
// app.use(helmet());
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "http://localhost:3000",
//     credentials: true,
//   })
// );

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
// });
// app.use(limiter);

// // Body parsing middleware
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true }));

// // Static files
// app.use(express.static("public"));

// // Routes
// app.use("/auth", authRoute);
// app.use("/chat", authenticate, chatRoute);
// app.use("/users", authenticate, userRoute);

// // Socket.io initialization
// socketService.init(io);

// // Error handling middleware
// app.use(errorHandler);

// // Health check endpoint
// app.get("/health", (req, res) => {
//   res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});

module.exports = app;
