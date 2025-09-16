document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    res.ok, " aaaaaaaaaaaaaaa", data;

    if (res.ok) {
      data.token;
      data.userId;

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId); // save token
      alert("Login successful!");
      window.location.href = "convo.html"; // go to dashboard
    } else {
      alert(data.message || "Invalid credentials");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong!");
  }
});
