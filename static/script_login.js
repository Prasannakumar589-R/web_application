function togglePassword() {
const password = document.getElementById("password");
password.type = password.type === "password" ? "text" : "password";
}

async function handleLogin() {
const username = document.getElementById("username").value;
const password = document.getElementById("password").value;
const message = document.getElementById("message");
const lang = document.getElementById('languageSelect').value;

const response = await fetch("/login", {
method: "POST",
headers: {
    "Content-Type": "application/json"
},
body: JSON.stringify({ username, password , lang })
});

const data = await response.json();
if (response.ok) {
//localStorage.setItem("token", data.token);
message.style.color = "green";
message.textContent = "Login successful!";
setTimeout(() => {
    window.location.href = "/dashboard"; // Change as needed
}, 100);
} else {

alert("please enter the correct username or password");
}
}

