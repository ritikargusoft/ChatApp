document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, email, password }),
      });
      if (res.ok) {
        alert("Registration successful! Please login.");
        window.location.href = "/login.html";
      } else {
        const err = await res.json();
        alert(err.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  });
