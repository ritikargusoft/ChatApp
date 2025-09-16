const token = localStorage.getItem("token");
const convoId = localStorage.getItem("activeConversation");
const userId = localStorage.getItem("userId");
console.log("Active Conversation ID:", convoId);

if (!token || !convoId) {
  window.location.href = "login.html";
}

const socket = io("http://localhost:3000", {
  auth: { token },
});

socket.on("connect", () => {
  console.log("Socket connected successfully. Joining conversation room.");
  socket.emit("Joined convo", convoId);
  loadHistory();
});

socket.on("message_created", addMessage);

console.log(addMessage);

async function loadHistory() {
  try {
    const res = await fetch(`/message/${convoId}`, {
      headers: { Authorization: `${token}` },
    });
    const data = await res.json();
    console.log("Fetched message history:", data);

    const messagesList = document.getElementById("messages");
    messagesList.innerHTML = "";

    data.data.forEach(addMessage);
  } catch (error) {
    console.error("Failed to load message history:", error);
  }
}

function addMessage(msg) {
  const li = document.createElement("li");
  li.textContent = `${msg.sender_id}: ${msg.message_content}`;
  document.getElementById("messages").appendChild(li);
}

document.getElementById("sendForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const input = document.getElementById("messageInput");
  const text = input.value;

  if (!text) return;
  console.log(userId, "@@@@@@@2");

  socket.emit("send_message", {
    conversation_id: convoId,
    sender_id: userId,
    message_content: text,
  });

  input.value = "";
});
