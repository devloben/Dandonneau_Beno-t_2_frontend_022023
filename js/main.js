// ! Récupération des données sur le serveur

const URL = 'http://localhost:5678/api/works'

//!New
// const getData = async (URL) => {
//     try {
//         const response = await fetch(URL)
//         if(!response.ok) {
//             throw new Error(`Network response was not ok (${response.status})`)
//         }
//         const projects = await response.json()
//         return projects
//     } catch (error) {
//         console.error('Error fetching data:', error)
//     }
// }

//!Old
async function getData() {
    const response = await fetch(URL)
    const projects = await response.json()
    return projects
}

//* Affichage de la Galerie

function removeProjects() {
    document.querySelector("#gallery").innerHTML = ""
}

function setProjectsGallery(projects){
    for (let i = 0; i < projects.length; i++) {
                
        const project = projects[i]
        const gallery = document.getElementById('gallery')
        const figure = document.createElement('figure')
        const image = document.createElement('img')
        image.src = project.imageUrl
        const title = document.createElement('figcaption')
        title.innerText = project.title

        gallery.append(figure)
        figure.append(image)
        figure.append(title)
    }
}
//!New 
//const drawProject = async () => {
//     try {
//       const projects = await getData(url);
//       setProjectsGallery(projects)
//       console.log(projects);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//!Old
function drawProjects() {
    getData().then((projects) => {
        setProjectsGallery(projects)
    }) 
}
removeProjects()
drawProjects()
 

//! FILTRES

function filterTous() {
    getData().then((PROJECTS) => {
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
    getData().then((PROJECTS) => {
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
    getData().then((PROJECTS) => {
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
    getData().then((PROJECTS) => {
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

function linkEdit(position, lien) {
    const POSITION = document.querySelector(position)
    const LIEN = document.createElement('a')
    LIEN.setAttribute('href', lien)
    LIEN.classList.add('js-modal')
    LIEN.innerHTML = '<i class="fa-solid fa-pen-to-square fa-lg"></i> Modifier'

    POSITION.append(LIEN)
}


//* Utilisateur authetifié. Mise en place éléments de modification.

const LOG_INOUT = document.querySelector('nav ul li:nth-child(3n) a')

function userAuthentify () {

    if (localStorage.getItem('userId') && localStorage.getItem('token')) {

        loginBarre()
        
        LOG_INOUT.innerText = 'logout'
        LOG_INOUT.setAttribute('href', '#')

        const FILTERS = document.querySelector('#portfolio ul')
        FILTERS.style.display = 'none'

        linkEdit('#introduction figure', '#')
        linkEdit('.mes-projets', '#modal1')
    }
}
userAuthentify()


//* Déconnexion

function deconnexion() {
    LOG_INOUT.innerText = 'login'
    
    localStorage.removeItem('userId')
    localStorage.removeItem('token')

    window.location.href = 'login.html'
}

LOG_INOUT.addEventListener('click', deconnexion)


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
    MODAL_GALLERY.style.display = null
    MODAL_NEW_PROJECT.style.display = 'none'
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
    FORM_NEW_PROJECT.reset()
        document.getElementById('chosen-image').src = ""
        let aMasquer = document.querySelector('.a-masquer')
        aMasquer.style.display = null
}

//TODO Mettre en anglais les noms de class et les constantes
const MODAL_GALLERY = document.querySelector('.modal-wrapper__gallery')
const MODAL_NEW_PROJECT = document.querySelector('.modal-wrapper__new-project')

function pageAjoutPhoto() {
    const BTN_UPLOAD_PHOTO = document.querySelector('#upload-photo')
    BTN_UPLOAD_PHOTO.addEventListener('click', function() {
        MODAL_GALLERY.style.display = "none"
        MODAL_NEW_PROJECT.style.display = null
        BTN_UPLOAD_PROJECT.setAttribute('disabled', 'true')
        resetFormNewProject()

        const msgConfirmationAjoutPhoto = document.getElementById('msgConfirmation-ajout-photo')
        msgConfirmationAjoutPhoto.style.display = 'none'

        let err_elem = document.getElementById('msg-err-serveur')
        err_elem.innerText = ""
        MSG_ERR_NEW_PROJECT.style.display = 'none'
    })
}
pageAjoutPhoto()

function retourGalerie() {
    const FLECHE_RETOUR = document.querySelector('.fa-arrow-left')
    FLECHE_RETOUR.addEventListener('click', function() {
        MODAL_GALLERY.style.display = null
        MODAL_NEW_PROJECT.style.display = 'none'
    })
}
retourGalerie()


//! Affichage des projets dans la modale

function removeProjectsModal() {
    document.querySelector("#projects-list").innerHTML = ""
}

function drawProjectsModal() {
    getData().then((PROJECTS) => {
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
    getData().then((PROJECTS) => {
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
const FORM_NEW_PROJECT = document.getElementById('form-new-projet')
const BTN_UPLOAD_PROJECT = document.getElementById('upload-project')
const MSG_ERR_NEW_PROJECT = document.getElementById('msg-err-new-project')

FORM_NEW_PROJECT.addEventListener('input', function() {

    if (titreValid(titre) && categorieValid(categorie) && photoValid(photo)) {
        BTN_UPLOAD_PROJECT.classList.add('valider-photo-ok')
        BTN_UPLOAD_PROJECT.removeAttribute('disabled')
        MSG_ERR_NEW_PROJECT.style.display = 'none'

        FORM_NEW_PROJECT.addEventListener('submit', envoyerPhoto)
    } else {
        MSG_ERR_NEW_PROJECT.style.display = 'block'
        MSG_ERR_NEW_PROJECT.style.color = 'red'
        BTN_UPLOAD_PROJECT.classList.remove('valider-photo-ok')
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
    let err_elem = document.getElementById('msg-err-serveur')
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
