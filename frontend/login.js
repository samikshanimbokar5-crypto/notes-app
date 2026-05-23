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

        alert(data.message);

        if(response.ok){

            localStorage.setItem("token", data.token);

            window.location.href = "dashboard.html";
        }

    } catch (error) {

        alert("Something went wrong");
    }
}