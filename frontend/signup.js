async function signup() {

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    try {

        const response = await fetch("https://notes-app-gjsd.onrender.com", {

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
            window.location.href = "login.html";
        }

    } catch (error) {

        alert("Something went wrong");
    }
}