document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {

            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {

                alert("Login successful");

                window.location.assign("http://127.0.0.1:5000/dashboard.html");

            } else {

                alert(data.error || "Login failed");

            }

        } catch (error) {

            console.error("Error:", error);
            alert("Something went wrong");

        }

    });

});