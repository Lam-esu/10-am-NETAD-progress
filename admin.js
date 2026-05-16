const API_BASE = "http://127.0.0.1:5000";

async function checkAuth() {
    const response = await fetch(`${API_BASE}/api/auth/me`, {
        credentials: "include"
    });

    if (!response.ok) {
        window.location.href = "index.html";
        return;
    }

    const user = await response.json();

    if (user.role !== "admin") {
        alert("Admin access required.");
        window.location.href = "dashboard.html";
    }
}

const addUserBtn = document.getElementById("addUserBtn");
const removeUserBtn = document.getElementById("removeUserBtn");
const resetPasswordBtn = document.getElementById("resetPasswordBtn");

if (addUserBtn) {
    addUserBtn.addEventListener("click", async () => {
        const username = prompt("Enter new username:");
        const email = prompt("Enter email:");
        const password = prompt("Enter password minimum 8 characters:");
        const role = prompt("Enter role: admin or user", "user");

        if (!username || !password) {
            alert("Username and password are required.");
            return;
        }

        const response = await fetch(`${API_BASE}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ username, email, password, role })
        });

        const result = await response.json();
        alert(result.message || result.error);
    });
}

if (removeUserBtn) {
    removeUserBtn.addEventListener("click", async () => {
        const userId = prompt("Enter user ID to disable:");

        if (!userId) return;

        const response = await fetch(`${API_BASE}/api/users/${userId}/disable`, {
            method: "POST",
            credentials: "include"
        });

        const result = await response.json();
        alert(result.message || result.error);
    });
}

if (resetPasswordBtn) {
    resetPasswordBtn.addEventListener("click", () => {
        alert("Password reset endpoint can be added next.");
    });
}

checkAuth();