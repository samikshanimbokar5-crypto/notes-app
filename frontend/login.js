async function login() {

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    try {

        const response = await fetch("https://notes-app-gjsd.onrender.com/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if(response.ok){

            // Save token
            localStorage.setItem("token", data.token);

            alert("Login successful");

            // Redirect
            window.location.href = "dashboard.html";

        } else {

            alert(data.message);
        }

    } catch (error) {

        alert("Something went wrong");
    }
}