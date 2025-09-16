const { Server } = require("socket.io");
const message = require("./services/messageService");

let io;

function initsocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("new user connected ", socket.id);

    socket.on("Joined convo", (conversation_id) => {
      socket.join(conversation_id);
      console.log(
        `Socket ${socket.id} joined conversation room: ${conversation_id}`
      );
    });

    socket.on(
      "send_message",
      async ({ conversation_id, sender_id, message_content }) => {
        try {
          console.log(conversation_id, sender_id, message_content);

          const messages = await message.createMessageService({
            conversation_id,
            sender_id,
            message_content,
          });

          console.log("message", messages);

          io.to(conversation_id).emit("message_created", messages);
        } catch (error) {
          console.error("Error creating message:", error);
          socket.emit("error", { error: "Failed to send message" });
        }
      }
    );

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}

module.exports = { initsocket };
