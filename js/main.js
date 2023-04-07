// ! Récupération des données sur le serveur

async function getProjects() {
    const RESPONSE = await fetch('http://localhost:5678/api/works')
    const PROJECTS = await RESPONSE.json()
    return PROJECTS
}

// ! Affichage de la Galerie

function removeProjects() {
    document.querySelector("#gallery").innerHTML = ""
}

function setProjectsGallery(projects){
    for (let i = 0; i < projects.length; i++) {
                
        const PROJECT = projects[i]
        const GALLERY = document.getElementById('gallery')
        const FIGURE = document.createElement('figure')
        const IMAGE = document.createElement('img')
        IMAGE.src = PROJECT.imageUrl
        const TITLE = document.createElement('figcaption')
        TITLE.innerText = PROJECT.title

        GALLERY.append(FIGURE)
        FIGURE.append(IMAGE)
        FIGURE.append(TITLE)
    }
}

function drawProjects() {
    getProjects().then((PROJECTS) => {
        setProjectsGallery(PROJECTS)
    }) 
}
removeProjects()
drawProjects()
 

//! FILTRES

function filterTous() {
    getProjects().then((PROJECTS) => {
        const BTN_OBJETS = document.querySelector("#tous")
        BTN_OBJETS.addEventListener("click", function () {
            removeProjects()
            const FILTER_PROJECTS = PROJECTS.filter(function(filter) {
                return filter.id
            })
            setProjectsGallery(FILTER_PROJECTS)
        }) 
    })
}

function filterObjet() {
    getProjects().then((PROJECTS) => {
        const BTN_OBJETS = document.querySelector("#objets")
        BTN_OBJETS.addEventListener("click", function () {
            removeProjects()
            const FILTER_PROJECTS = PROJECTS.filter(function(filter) {
                return filter.categoryId == 1
            })
            setProjectsGallery(FILTER_PROJECTS)
        }) 
    })
}

function filterAppartements() {
    getProjects().then((PROJECTS) => {
        const BTN_OBJETS = document.querySelector("#appartements")
        BTN_OBJETS.addEventListener("click", function () {
            removeProjects()
            const FILTER_PROJECTS = PROJECTS.filter(function(filter) {
                return filter.categoryId == 2
            })
            setProjectsGallery(FILTER_PROJECTS)
        }) 
    })
}

function filterHotels() {
    getProjects().then((PROJECTS) => {
        const BTN_OBJETS = document.querySelector("#hotels-restaurants")
        BTN_OBJETS.addEventListener("click", function () {
            removeProjects()
            const FILTER_PROJECTS = PROJECTS.filter(function(filter) {
                return filter.categoryId == 3
            })
            setProjectsGallery(FILTER_PROJECTS)
        }) 
    })
}

filterTous()
filterObjet()
filterAppartements()
filterHotels()


//! Affichage utilisateur authentifié

function loginBarre() {
    const BODY = document.querySelector('body')

    const LOGIN_BARRE = document.createElement('div')
    LOGIN_BARRE.classList.add('login-barre')

    const HEADER = document.querySelector('header')
    HEADER.classList.add('header-login')

    const ICONE = document.createElement('i')
    ICONE.classList.add('fa-solid', 'fa-pen-to-square', 'fa-lg')
    
    const EDITION = document.createElement('p')
    EDITION.innerText = 'Mode édition'

    const PUBLIER = document.createElement('p')
    PUBLIER.classList.add('login-barre__publier')
    PUBLIER.innerText = 'publier les changements'

    BODY.prepend(LOGIN_BARRE)
    LOGIN_BARRE.append(ICONE)
    LOGIN_BARRE.append(EDITION)
    LOGIN_BARRE.append(PUBLIER)
}

function liensModifier(position, lien) {
    const POSITION = document.querySelector(position)
    const LIEN = document.createElement('a')
    LIEN.setAttribute('href', lien)
    LIEN.classList.add('js-modal')
    LIEN.innerHTML = '<i class="fa-solid fa-pen-to-square fa-lg"></i> Modifier'

    POSITION.append(LIEN)
}

//TODO - Revoir le nom du lien Login/LogOut
//* Authentification utilisateur. Mise en place éléments spécifiques

const LOGIN = document.querySelector('nav ul li:nth-child(3n) a')

function utilisateurAuthentifie () {

    if (localStorage.getItem('userId') && localStorage.getItem('token')) {

        loginBarre()
        
        LOGIN.innerText = 'logout'
        LOGIN.setAttribute('href', '#')

        const FILTRES = document.querySelector('#portfolio ul')
        FILTRES.style.display = 'none'

        liensModifier('#introduction figure', '#')
        liensModifier('.mes-projets', '#modal1')
    }
}
utilisateurAuthentifie()


//* Déconnexion

function deconnexion() {
    LOGIN.innerText = 'login'
    
    localStorage.removeItem('userId')
    localStorage.removeItem('token')

    window.location.href = 'login.html'
}
LOGIN.addEventListener('click', deconnexion)


//! Modale

let modal = null
const OPEN_MODAL = function(e) {
    e.preventDefault() 
    modal = document.querySelector(e.target.getAttribute('href'))
    modal.style.display = null
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', CLOSE_MODAL)
    modal.querySelectorAll('.js-modal-close').forEach(e => {e.addEventListener('click', CLOSE_MODAL)})
    modal.querySelector('.js-modal-stop').addEventListener('click', STOP_PROPAGATION)
    MODAL_GALERIE.style.display = null
    MODAL_AJOUT_PHOTO.style.display = 'none'
}

const CLOSE_MODAL = async function (e) {
    if (modal === null) return
    e.preventDefault(e)
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', CLOSE_MODAL)
    modal.querySelector('.js-modal-close').removeEventListener('click', CLOSE_MODAL)
    modal.querySelector('.js-modal-stop').removeEventListener('click', STOP_PROPAGATION)
    modal = null 
    removeProjects()
    drawProjects()
}
 
const STOP_PROPAGATION = function(e) {
    e.stopPropagation()
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', OPEN_MODAL)
})

window.addEventListener('keydown', function(e) {
    if (e.key === "Escape") {
        CLOSE_MODAL(e)
    }
})


// * Navigation entre les pages Galerie et Ajout Photo de la Modale

function resetFormNewProject(){
    formAjoutPhoto.reset()
        document.getElementById('chosen-image').src = ""
        let aMasquer = document.querySelector('.a-masquer')
        aMasquer.style.display = null
}

//TODO Mettre en anglais les noms de class et les constantes
const MODAL_GALERIE = document.querySelector('.modal-wrapper__galerie')
const MODAL_AJOUT_PHOTO = document.querySelector('.modal-wrapper__ajout-photo')

function pageAjoutPhoto() {
    const BTN_AJOUTER_PHOTO = document.querySelector('#ajout-photo')
    BTN_AJOUTER_PHOTO.addEventListener('click', function() {
        MODAL_GALERIE.style.display = "none"
        MODAL_AJOUT_PHOTO.style.display = null
        btnValiderPhoto.setAttribute('disabled', 'true')
        resetFormNewProject()
        const msgConfirmationAjoutPhoto = document.getElementById('msgConfirmation-ajout-photo')
        msgConfirmationAjoutPhoto.style.display = 'none'
    })
}
pageAjoutPhoto()

function retourGalerie() {
    const FLECHE_RETOUR = document.querySelector('.fa-arrow-left')
    FLECHE_RETOUR.addEventListener('click', function() {
        MODAL_GALERIE.style.display = null
        MODAL_AJOUT_PHOTO.style.display = 'none'
    })
}
retourGalerie()


//! Affichage des projets dans la modale

function removeProjectsModal() {
    document.querySelector("#projects-list").innerHTML = ""
}

function drawProjectsModal() {
    getProjects().then((PROJECTS) => {
        for (let i = 0; i < PROJECTS.length; i++) {

            const PROJECT = PROJECTS[i]
            const GALLERY = document.querySelector("#projects-list")
            const FIGURE = document.createElement("figure")
            const EDIT = document.createElement('p')
            EDIT.innerText = 'éditer'

            const IMAGE = document.createElement("img")
            IMAGE.src = PROJECT.imageUrl
            
            const MOVE = document.createElement('i')
            FIGURE.addEventListener('mouseover', () => {
                MOVE.classList.add('fa-solid', 'fa-arrows-up-down-left-right')
            })
            FIGURE.addEventListener('mouseout', () => {
                MOVE.classList.remove('fa-solid', 'fa-arrows-up-down-left-right')
            })

            const TRASH = document.createElement('i')
            TRASH.classList.add('fa-solid', 'fa-trash-can')
            TRASH.dataset.id = PROJECT.id
            
            GALLERY.appendChild(FIGURE)
            FIGURE.appendChild(IMAGE)
            FIGURE.append(EDIT)
            FIGURE.append(MOVE)
            FIGURE.append(TRASH)
        }
    })
    removeProjectModal()
}
removeProjectsModal()
drawProjectsModal()
    

//! Suppression de projets dans la modale

const TOKEN = window.localStorage.getItem('token')

function removeProjectModal() {
    getProjects().then((PROJECTS) => {
        const TRASH = document.querySelectorAll('#projects-list figure i:nth-child(2n)')

        for (let i = 0; i < PROJECTS.length; i++) {
            //TODO expliquer cette fonction
            TRASH[i].addEventListener('click', async function (event){
                const id = event.target.dataset.id 
                await fetch(`http://localhost:5678/api/works/${id}`, {
                method: "DELETE",
                headers: {Authorization: `Bearer ${TOKEN}`}
                })
            
                removeProjectsModal()
                drawProjectsModal() 
            })
        }
    }) 
}

//! Formulaire de création d'un nouveau projet

//Téléchargement de la photo
//TODO voir pourquoi de let et pas des const ???
let uploadButton = document.getElementById("upload-button");
let chosenImage = document.getElementById("chosen-image");
let fileName = document.getElementById("file-name");

uploadButton.onchange = () => {
    let reader = new FileReader();
    reader.readAsDataURL(uploadButton.files[0]);
    reader.onload = () => {
        chosenImage.setAttribute("src",reader.result);
    }
    let aMasquer = document.querySelector('.a-masquer')
    aMasquer.style.display = "none"
    fileName.textContent = uploadButton.files[0].name;
}

//Test Photo
let photo = document.getElementById('upload-button')
photo.addEventListener('input', function() {
    photoValid(this)
})
let photoValid = function(saisiePhoto) {
    let testPhoto = saisiePhoto.files[0]

    if (testPhoto) {
        return true
        } else {
        return false
        }
}

//Test Titre
let titre = document.getElementById('titre')
titre.addEventListener('input', function() {
    titreValid(this)
})
let titreValid = function(saisieTitre) {
    let titreRegex = /[0-9a-zA-Z]{2,}/
    let testTitre = titreRegex.test(saisieTitre.value)

    if (testTitre) {
        return true
        } else {
        return false
        }
}

//Test Catégorie
let categorie = document.getElementById('categorie-select')
categorie.addEventListener('input', function() {
    categorieValid(this)
})

let categorieValid = function(saisieCategorie) {
    
    if (saisieCategorie.value != "") {
        return true
        } else {
        return false
        }
}

// Modif bouton formulaire
//TODO Mettre les noms en anglais
const formAjoutPhoto = document.getElementById('form-ajout-photo')
const btnValiderPhoto = document.getElementById('valider-photo')
const msgErrFormPhoto = document.getElementById('msgErr-form-photo')

formAjoutPhoto.addEventListener('input', function() {

    if (titreValid(titre) && categorieValid(categorie) && photoValid(photo)) {
        btnValiderPhoto.classList.add('valider-photo-ok')
        btnValiderPhoto.removeAttribute('disabled')
        msgErrFormPhoto.style.display = 'none'

        formAjoutPhoto.addEventListener('submit', envoyerPhoto)
    } else {
        
        msgErrFormPhoto.style.display = 'block'
        msgErrFormPhoto.style.color = 'red'
        btnValiderPhoto.classList.remove('valider-photo-ok')
    }
})


// ! Envoi du formulaire Ajout Photo

//TODO Mettre les noms en anglais
//Gestion des erreurs
function gestionErreursAjoutPhoto(response) {
    if (!response || response.status > 201) {
        throw new Error('Le serveur ne répond pas, réessayez ultérieurement.')
    }
}

function affichageErreursAjoutPhoto(err) {
    let msg = err.message
    let err_elem = document.getElementById('msgErr-ajout-photo')
    err_elem.innerText = msg
    err_elem.style.color = 'red'
}


//Validation du formulaire, construction de la requête serveur
async function envoyerPhoto(e) {
    e.preventDefault()

    const titre = document.getElementById('titre').value
    const image = document.getElementById('upload-button').files[0]
    const categorie = document.getElementById('categorie-select').value
    
    const formData = new FormData()
    formData.append('title', titre)
    formData.append('image', image)
    formData.append('category', categorie)

    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: { "Authorization": `Bearer ${TOKEN}` }, 
            body: formData
            })
        
        gestionErreursAjoutPhoto(response)
        
        const msgConfirmationAjoutPhoto = document.getElementById('msgConfirmation-ajout-photo')
        msgConfirmationAjoutPhoto.style.display = 'block'
        msgConfirmationAjoutPhoto.style.color = '#1D6154'

        removeProjectsModal()
        drawProjectsModal() 
        resetFormNewProject()

    } catch(err) {
        affichageErreursAjoutPhoto(err)
        console.log(err)
    }
}


// ! Proposition Fabien
// // vérifie que les champs sont valides.
// // si tout est bon, le bouton devient cliquable
// // s'il y a une erreur, alors le bouton n'est pas cliquable et un texte explique d'erreur en dessous du champ concerné
// function checkFormValidity() {
//     let titre = document.getElementById("titre")
//     let titreRegex = /[0-9a-zA-Z]{2,}/
//     let titleIsValid = false
    
//     titre.addEventListener('input', (e) => {
//         let val = e.target.value
//         titleIsValid = titreRegex.test(val)

//         // afficher un message d'erreur si jamais le isValid === false
//         let titreErreur = document.getElementById('titreErreur')
//         if (titleIsValid === false) {
//             titreErreur.style.display = 'block'
//         } else {
//             titreErreur.style.display = 'none'
//         }
//     })
    

//     // faire les autres vérifications
    
//     if (titleIsValid && fileIsValid && categoryIsValid) {
//         // rendre le bouton cliquable
//         // recupérer les valeurs des champs (normalement directement récupérable avec titre.value, file.value et category.value)
//         // envoyer la requete a l'API lorsqu'on clique dessus
//     } else {
//         // le bouton doit rester inactif
//     }
// }
// checkFormValidity()
