function checkError(response) {
    if (!response || response.status === 500) {
        throw new Error("Le serveur ne répond pas, réessayez ultérieurement.")
    } else if (response.status > 200 && response.status <= 404) {
        throw new Error("Erreur dans l’identifiant ou le mot de passe")
    }
}

function displayError(error) {
    let msg = error.message
    let error_elem = document.getElementById("error_msg")
    error_elem.innerText = msg
}

// Authentification de l'utilisateur
const loginForm = document.getElementById("login-form")
loginForm.addEventListener("submit", login)

 async function login(e) {
    e.preventDefault()
    const loginObjet = {
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value
    }
    try{ 
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { 
                "Accept": "application/json",
                "Content-Type": "application/json" },
            body: JSON.stringify(loginObjet)
            })
            checkError(response)

            const jsonResponse = await response.json()
            const id = jsonResponse.userId
            const token = jsonResponse.token

            // Envoi du login sur le Local Storage
            window.localStorage.setItem("userId", id)
            window.localStorage.setItem("token", token)

            // Redirection page d'accueil
            window.location.href = "../index.html"
    } catch(error) {
        displayError(error)
        console.log(error)
        }
}

// email: sophie.bluel@test.tld
// password: S0phie
