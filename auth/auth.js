function gestionErreurs(response) {
    if (!response || response.status === 500) {
        throw new Error('Le serveur ne répond pas, réessayez ultérieurement.')
    } else if (response.status === 404) {
        throw new Error('Couple login mot de passe incorrect')
    }
}

function affichageErreurs(err) {
    let msg = err.message
    let err_elem = document.getElementById('error_msg')
    err_elem.innerText = msg
    err_elem.style.color = 'red'
}

// Authentification de l'utilisateur
const loginForm = document.getElementById('login-form')
loginForm.addEventListener('submit', authentification)


 async function authentification(e) {
    e.preventDefault()
    const loginObjet = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
    }
    
    try{ 
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: "POST",
            headers: { 
                "Accept": "application/json",
                "Content-Type": "application/json" },
            body: JSON.stringify(loginObjet)
            })
            
        
            gestionErreurs(response)

            const jsonResponse = await response.json()
            
            const id = jsonResponse.userId
            const token = jsonResponse.token

            // Envoi du login sur le Local Storage
            window.localStorage.setItem("userId", id)
            window.localStorage.setItem("token", token)

            // Redirection page d'accueil
            window.location.href = '../index.html'

    } catch(err) {
        affichageErreurs(err)
        console.log(err)
        }
}

  
// email: sophie.bluel@test.tld
// password:  S0phie
