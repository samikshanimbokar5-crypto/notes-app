const token = localStorage.getItem("token");


// Redirect if not logged in
if (!token) {
    window.location.href = "login.html";
}


// CREATE NOTE
async function createNote() {

    const title = document.getElementById("title").value;

    const content = document.getElementById("content").value;

    if(title === "" || content === ""){
        alert("Please fill all fields");
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:5000/api/notes/create",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },

                body: JSON.stringify({
                    title,
                    content
                })
            }
        );

        const data = await response.json();

        alert(data.message);

        // Clear fields
        document.getElementById("title").value = "";
        document.getElementById("content").value = "";

        // Reload notes
        getNotes();

    } catch (error) {

        alert("Error creating note");
    }
}


// GET NOTES
async function getNotes() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/notes",
            {

                headers: {
                    "Authorization": token
                }
            }
        );

        const notes = await response.json();

        const notesDiv = document.getElementById("notes");

        notesDiv.innerHTML = "";

        // If no notes
        if(notes.length === 0){

            notesDiv.innerHTML = `
                <p style="margin-top:20px;">
                    No notes available
                </p>
            `;

            return;
        }

        // Display notes
        notes.forEach(note => {

            notesDiv.innerHTML += `

                <div class="note-card">

                    <h3>${note.title}</h3>

                    <p>${note.content}</p>

                    <button 
                        class="delete-btn"
                        onclick="deleteNote('${note._id}')"
                    >
                        Delete
                    </button>

                </div>
            `;
        });

    } catch (error) {

        alert("Error fetching notes");
    }
}


// DELETE NOTE
async function deleteNote(id) {

    try {

        await fetch(
            `https://notes-app-gjsd.onrender.com/delete/${id}`,
            {

                method: "DELETE",

                headers: {
                    "Authorization": token
                }
            }
        );

        getNotes();

    } catch (error) {

        alert("Error deleting note");
    }
}


// LOGOUT
function logout() {

    localStorage.removeItem("token");

    window.location.href = "login.html";
}


// Load Notes Automatically
getNotes();