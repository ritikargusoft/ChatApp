const openDialog = document.getElementById("btnNew");
const dialog = document.getElementById("dialog");
const close = document.getElementById("close");
const userSearch = document.getElementById("userSearch");
const results = document.getElementById("results");
const selectedUsers = document.getElementById("selectedUsers");
const saveUsers = document.getElementById("saveUsers");
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

let allUsers = [];
let selectedUserIds = [];

async function loadConversations() {
  const token = localStorage.getItem("token");
  if (!token) return (window.location.href = "login.html");
  const res = await fetch("/conversations", {
    headers: { Authorization: `${token}` },
  });
  const data = await res.json();
  const list = document.getElementById("convoList");
  list.innerHTML = "";
  data.data.forEach((convo) => {
    const li = document.createElement("li");
    li.textContent = `Conversation ${convo.conversation_id}`;
    li.addEventListener("click", () => {
      localStorage.setItem("activeConversation", convo.conversation_id);
      window.location.href = "chat.html";
    });
    list.appendChild(li);
  });
}

openDialog.addEventListener("click", () => {
  dialog.style.display = "block";
});
close.addEventListener("click", () => {
  dialog.style.display = "none";
});

userSearch.addEventListener("focus", async () => {
  if (allUsers.length === 0) {
    try {
      const res = await fetch("/users");
      const users = await res.json();
      allUsers = users.filter((element) => element.user_id != userId);
    } catch (error) {
      console.log(error);
    }
  }
  showResults(allUsers);
});

userSearch.addEventListener("input", () => {
  const query = userSearch.value.toLowerCase();
  const filtered = allUsers.filter(
    (user) =>
      user.fullname.toLowerCase().includes(query) &&
      !selectedUserIds.includes(user.user_id)
  );
  showResults(filtered);
});

function showResults(users) {
  results.innerHTML = "";

  if (users.length === 0) return;

  users.forEach((user) => {
    const div = document.createElement("div");
    div.textContent = ` ${user.fullname}`;
    div.addEventListener("click", () => {
      addUser(user);
    });
    results.appendChild(div);
  });
}

function addUser(user) {
  user;

  if (selectedUserIds.includes(user.user_id)) return;
  selectedUserIds.push(user.user_id);
  selectedUserIds;

  const div = document.createElement("div");
  div.textContent = user.fullname;
  div.dataset.userId = user.user_id;
  selectedUsers.appendChild(div);

  userSearch.value = "";
  showResults(allUsers.filter((u) => !selectedUserIds.includes(u.user_id)));
}

saveUsers.addEventListener("click", async () => {
  selectedUserIds;

  if (!selectedUserIds.length) {
    alert("Select at least one user");
    return;
  }

  try {
    const res = await fetch("/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({ dataMembers: selectedUserIds }),
    });

    selectedUserIds = [];
    selectedUsers.innerHTML = "";
  } catch (error) {
    console.error(error);
  }

  dialog.style.display = "none";
});

loadConversations();
