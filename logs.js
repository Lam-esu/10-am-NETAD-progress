const API_BASE = "http://127.0.0.1:5000";

async function checkAuth() {
    const response = await fetch(`${API_BASE}/api/auth/me`, {
        credentials: "include"
    });

    if (!response.ok) {
        window.location.href = "index.html";
    }
}

async function loadLogs() {
    const response = await fetch(`${API_BASE}/api/logs`, {
        credentials: "include"
    });

    if (!response.ok) {
        alert("Admin access required to view logs.");
        return;
    }

    const logs = await response.json();
    const table = document.getElementById("logsTable");
    table.innerHTML = "";

    logs.forEach(log => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${log.username || "Unknown"}</td>
            <td>${log.action}</td>
            <td>${log.ip_address || "N/A"}</td>
            <td>${log.created_at}</td>
        `;

        table.appendChild(row);
    });
}

const exportLogs = document.getElementById("exportLogs");
const searchLogs = document.getElementById("searchLogs");

if (exportLogs) {
    exportLogs.addEventListener("click", () => {
        window.location.href = `${API_BASE}/api/logs/export`;
    });
}

if (searchLogs) {
    searchLogs.addEventListener("keyup", () => {
        const searchValue = searchLogs.value.toLowerCase();
        const rows = document.querySelectorAll("#logsTable tr");

        rows.forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(searchValue) ? "" : "none";
        });
    });
}

checkAuth();
loadLogs();