//Affichage site public
// Récupération des données
const URL = "http://localhost:5678/api/works"
async function retrieveProjects() {
    try {
        const response = await fetch(URL)
        if(!response.ok) {
            throw new Error(`Le serveur ne répond pas, réessayez ultérieurement : (${response.status})`)
        }
        const projects = await response.json()
        return projects
    } catch (error) {
        console.error("Nous rencontrons un problème pour récupérer les données:", error)
    }
}

// Affichage de la Galerie
function removeProjects() {
    document.querySelector("#gallery").innerHTML = ""
}

function setGallery(projects){
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i]
        const gallery = document.getElementById("gallery")
        const figure = document.createElement("figure")
        const image = document.createElement("img")
        image.src = project.imageUrl
        const title = document.createElement("figcaption")
        title.innerText = project.title

        gallery.append(figure)
        figure.append(image)
        figure.append(title)
    }
}
async function drawProjects() {
    const projects = await retrieveProjects();
    setGallery(projects)
}
removeProjects()
drawProjects()
 
// Filtres
async function filterTous() {
    const projects = await retrieveProjects()
    const btnTous = document.querySelector("#tous")
    btnTous.addEventListener("click", function () {
        removeProjects()
        const filter = projects.filter(function(filter) {
            return filter.id
        })
        setGallery(filter)
    }) 
}

async function filter(elementId, categoryId) {
    const projects = await retrieveProjects()
    const btnFilter = document.getElementById(elementId)
    btnFilter.addEventListener("click", function () {
        removeProjects()
        const filter = projects.filter(function(filter) {
             return filter.categoryId == categoryId
        })
        setGallery(filter)
    }) 
}
filterTous()
filter("objets",1)
filter("appartements",2)
filter("hotels",3)

// Utilisateur Authentifié
// Création des éléments de modification.
function loginBarre() {
    const body = document.querySelector("body")

    const blackBar = document.createElement("div")
    blackBar.classList.add("blackbar")

    const header = document.querySelector("header")
    header.classList.add("header-login")

    const iconEdit = document.createElement("i")
    iconEdit.classList.add("fa-solid", "fa-pen-to-square", "fa-lg")
    
    const editMode = document.createElement("p")
    editMode.innerText = "Mode édition"

    const publish = document.createElement("p")
    publish.classList.add("blackbar__publier")
    publish.innerText = "publier les changements"

    body.prepend(blackBar)
    blackBar.append(iconEdit)
    blackBar.append(editMode)
    blackBar.append(publish)
}

function linkEdit(position, link) {
    const linkPosition = document.querySelector(position)
    const linkTarget = document.createElement("a")
    linkTarget.setAttribute("href", link)
    linkTarget.classList.add("js-modal")
    linkTarget.innerHTML = '<i class="fa-solid fa-pen-to-square fa-lg"></i> Modifier'

    linkPosition.append(linkTarget)
}

// Affichage des éléments de modification.
const logInOut = document.querySelector("nav ul li:nth-child(3n) a")

function userAuthentify () {
    if (localStorage.getItem("userId") && localStorage.getItem("token")) {
        
        loginBarre()

        logInOut.innerText = "logout"
        logInOut.setAttribute("href", "#")

        const filters = document.querySelector("#portfolio ul")
        filters.style.display = "none"

        linkEdit("#introduction figure", "#")
        linkEdit(".mes-projets", "#modal1")
    }
}
userAuthentify()

// Déconnexion
function deconnexion() {
    logInOut.innerText = "login"
    
    localStorage.removeItem("userId")
    localStorage.removeItem("token")

    window.location.href = "login.html"
}
logInOut.addEventListener("click", deconnexion)

// Modale
let modal = null
const openModal = function(e) {
    e.preventDefault() 
    modal = document.querySelector(e.target.getAttribute("href"))
    modal.style.display = null
    modal.removeAttribute("aria-hidden")
    modal.setAttribute("aria-modal", "true")
    modal.addEventListener("click", closeModal)
    modal.querySelectorAll(".js-modal-close").forEach(e => {e.addEventListener("click", closeModal)})
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
    modalGallery.style.display = null
    modalNewProject.style.display = "none"
}

const closeModal = async function (e) {
    if (modal === null) return
    e.preventDefault(e)
    modal.style.display = "none"
    modal.setAttribute("aria-hidden", "true")
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
    modal = null 
    removeProjects()
    drawProjects()
}
 
const stopPropagation = function(e) {
    e.stopPropagation()
}

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal)
})

window.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        closeModal(e)
    }
})

// Navigation entre les pages Galerie et Ajout Photo de la Modale
const modalGallery = document.querySelector(".modal-wrapper__gallery")
const modalNewProject = document.querySelector(".modal-wrapper__new-project")
const msgConfirmNewProject = document.getElementById("msg-confirm-new-project")

function resetFormNewProject(){
    formNewProject.reset()
        document.getElementById("chosen-image").src = ""
        let uploadArea = document.querySelector(".upload-area")
        uploadArea.style.display = null
        btnUploadProject.classList.remove("form-new-project-valid")
        btnUploadProject.setAttribute("disabled", "true")       
}

function displayFormNewProject() {
    const btnUploadPhoto = document.querySelector("#upload-photo")
    btnUploadPhoto.addEventListener("click", function() {
        modalGallery.style.display = "none"
        modalNewProject.style.display = null
        btnUploadProject.setAttribute("disabled", "true")
        
        resetFormNewProject()
        
        msgConfirmNewProject.style.display = "none"

        let error_elem = document.getElementById("msg-err-serveur")
        error_elem.innerText = ""
        msgErrorNewProject.style.display = "none"
    })
}
displayFormNewProject()

function retourGalerie() {
    const arrowBack = document.querySelector(".fa-arrow-left")
    arrowBack.addEventListener("click", function() {
        modalGallery.style.display = null
        modalNewProject.style.display = "none"
    })
}
retourGalerie()

// Affichage des projets dans la modale
function removeProjectsModal() {
    document.querySelector("#projects-list").innerHTML = ""
}

function drawProjectsModal() {
    retrieveProjects().then((projects) => {
        for (let i = 0; i < projects.length; i++) {

            const project = projects[i]
            const gallery = document.querySelector("#projects-list")
            const figure = document.createElement("figure")
            const edit = document.createElement("p")
            edit.innerText = "éditer"

            const image = document.createElement("img")
            image.src = project.imageUrl
            
            const move = document.createElement("i")
            figure.addEventListener("mouseover", () => {
                move.classList.add("fa-solid", "fa-arrows-up-down-left-right")
            })
            figure.addEventListener("mouseout", () => {
                move.classList.remove("fa-solid", "fa-arrows-up-down-left-right")
            })

            const trash = document.createElement("i")
            trash.classList.add("fa-solid", "fa-trash-can")
            trash.dataset.id = project.id
            
            gallery.appendChild(figure)
            figure.appendChild(image)
            figure.append(edit)
            figure.append(move)
            figure.append(trash)
        }
    })
    removeProjectModal()
}
removeProjectsModal()
drawProjectsModal()
    

// Suppression de projets dans la modale
const token = window.localStorage.getItem("token")

function removeProjectModal() {
    retrieveProjects().then((projects) => {
        const trash = document.querySelectorAll("#projects-list figure i:nth-child(2n)")

        for (let i = 0; i < projects.length; i++) {
            //TODO expliquer cette fonction
            trash[i].addEventListener("click", async function (event){
                const id = event.target.dataset.id 
                await fetch(`http://localhost:5678/api/works/${id}`, {
                method: "DELETE",
                headers: {Authorization: `Bearer ${token}`}
                })
            
                removeProjectsModal()
                drawProjectsModal() 
            })
        }
    }) 
}

// Formulaire de création d'un nouveau projet
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
    let uploadArea = document.querySelector(".upload-area")
    uploadArea.style.display = "none"
    fileName.textContent = uploadButton.files[0].name;
}

//Test Photo
let photo = document.getElementById("upload-button")
photo.addEventListener("input", function() {
    photoValid(this)
})
let photoValid = function(saisiePhoto) {
    let testPhoto = saisiePhoto.files[0]

    if (testPhoto) {
        msgConfirmNewProject.style.display = "none"
        return true
        } else {
        return false
        }
}

//Test Titre
let title = document.getElementById("title")
title.addEventListener("input", function() {
    titleValid(this)
})
let titleValid = function(entryTitle) {
    let titleRegex = /[0-9a-zA-Z]{2,}/
    let testTitle = titleRegex.test(entryTitle.value)

    if (testTitle) {
        msgConfirmNewProject.style.display = "none"
        return true
        } else {
        return false
        }
}

//Test Catégorie
let category = document.getElementById("category")
category.addEventListener("input", function() {
    categoryValid(this)
})

let categoryValid = function(entryCategory) {
    
    if (entryCategory.value != "") {
        msgConfirmNewProject.style.display = "none"
        return true
        } else {
        return false
        }
}

// Modif bouton formulaire
const formNewProject = document.getElementById("form-new-project")
const btnUploadProject = document.getElementById("upload-project")
const msgErrorNewProject = document.getElementById("msg-err-new-project")

formNewProject.addEventListener("input", function() {

    if (titleValid(title) && categoryValid(category) && photoValid(photo)) {
        btnUploadProject.classList.add("form-new-project-valid")
        btnUploadProject.removeAttribute("disabled")
        msgErrorNewProject.style.display = "none"

        formNewProject.addEventListener("submit", postNewProject)
    } else {
        msgErrorNewProject.style.display = "block"
        msgErrorNewProject.style.color = "red"
        btnUploadProject.classList.remove("form-new-project-valid")
    }
})

// Envoi du formulaire Ajout Photo
//Gestion des erreurs
function checkError(response) {
    if (!response || response.status > 201) {
        throw new Error("Le serveur ne répond pas, réessayez ultérieurement.")
    }
}

function displayError(error) {
    let msg = error.message
    let error_elem = document.getElementById("msg-err-serveur")
    error_elem.innerText = msg
    error_elem.style.color = "red"
}

//Ajout nouveau projet - Validation et envoi du formulaire.
async function postNewProject(e) {
    e.preventDefault()

    const title = document.getElementById("title").value
    const image = document.getElementById("upload-button").files[0]
    const category = document.getElementById("category").value
    
    const formData = new FormData()
    formData.append("title", title)
    formData.append("image", image)
    formData.append("category", category)

    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` }, 
            body: formData
            })
        
            checkError(response)
        
        msgConfirmNewProject.style.display = "block"
        msgConfirmNewProject.style.color = "#1D6154"

        removeProjectsModal()
        drawProjectsModal() 
        resetFormNewProject()

    } catch(err) {
        displayError(err)
        console.log(err)
    }
}