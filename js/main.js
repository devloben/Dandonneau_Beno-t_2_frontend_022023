// Récupération des travaux depuis le Backend et transformation au format JSON
const reponse = await fetch('http://localhost:5678/api/works')
const works = await reponse.json()


// Création d'une fonction permettant de rafraichir la liste des travaux
function initialiseWorks(works) {

    //* Affichage de l'ensemble des travaux
    for (let i = 0; i < works.length; i++) {
        
        // Création d'une fiche pour chaque travaux
        const figure = works[i]

        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionGallery = document.querySelector(".gallery")

        // Création d'une balise dédiée à une fiche
        const workElement = document.createElement("figure")

        // Création du contenu des fiches
        const imageElement = document.createElement("img")
        imageElement.src = figure.imageUrl
        const captionElement = document.createElement("figcaption")
        captionElement.innerText = figure.title

        // Rattachement de la balise "figure" à la class "gallery"
        sectionGallery.appendChild(workElement)

        // Rattachement des éléments à la fiche
        workElement.appendChild(imageElement)
        workElement.appendChild(captionElement)
    }
}

// Initialisation de l'affichage de la gallery
initialiseWorks(works)

 
//* Création des filtres

const filtreTous = document.querySelector("#tous")
filtreTous.addEventListener("click", function() {
    const worksTous = works.filter(function(work) {
        return work.id
    })
    initialiseWorks(worksTous)
})

const filtreObjets = document.querySelector("#objets")
filtreObjets.addEventListener("click", function () {
    const worksFiltres = works.filter(function (work) {
        return work.categoryId == 1
    })
    document.querySelector(".gallery").innerHTML = ""
    initialiseWorks(worksFiltres)
})

const filtreAppartements = document.querySelector("#appartements")
filtreAppartements.addEventListener("click", function () {
    const worksFiltres = works.filter(function (work) {
        return work.categoryId == 2
    })
    document.querySelector(".gallery").innerHTML = ""
    initialiseWorks(worksFiltres)
})

const filtreHotelsRestaurants = document.querySelector("#hotels-restaurants");
filtreHotelsRestaurants.addEventListener("click", function () {
    const worksFiltres = works.filter(function (work) {
        return work.categoryId == 3
    })
    document.querySelector(".gallery").innerHTML = ""
    initialiseWorks(worksFiltres)
})


//* Mode utilisateur authentifié

function barreNoire() {
    const body = document.querySelector('body')

        const loginBarre = document.createElement('div')
        loginBarre.classList.add('login-barre')

        const header = document.querySelector('header')
        header.classList.add('header-login')

        const icone = document.createElement('i')
        icone.classList.add('fa-solid', 'fa-pen-to-square', 'fa-lg')
        
        const edition = document.createElement('p')
        edition.innerText = 'Mode édition'

        const publier = document.createElement('p')
        publier.classList.add('login-barre__publier')
        publier.innerText = 'publier les changements'

        body.prepend(loginBarre)
        loginBarre.append(icone)
        loginBarre.append(edition)
        loginBarre.append(publier)
}

function liensModifier(position, lien) {
    const choixPosition = document.querySelector(position)
    const choixLien = document.createElement('a')
    choixLien.setAttribute('href', lien)
    choixLien.classList.add('js-modal')
    choixLien.innerHTML = '<i class="fa-solid fa-pen-to-square fa-lg"></i> Modifier'

    choixPosition.append(choixLien)
}

// Affiche les éléments de modification
const login = document.querySelector('nav ul li:nth-child(3n) a')
function utilisateurAuthentifie () {
    if (localStorage.getItem('userId') && localStorage.getItem('token')) {

        barreNoire()
        
        login.innerText = 'logout'
        login.setAttribute('href', '#')

        const filtres = document.querySelector('#portfolio ul')
        filtres.style.display = 'none'

        liensModifier('#introduction figure', '#')
        liensModifier('.mes-projets', '#modal1')
    }
}
utilisateurAuthentifie()


function deconnexion() {
    login.innerText = 'login'
    
    localStorage.removeItem('userId')
    localStorage.removeItem('token')

    window.location.href = 'login.html'
}
login.addEventListener('click', deconnexion)


// * Boite Modale

let modal = null
const openModal = function(e) {
    e.preventDefault() 
    modal = document.querySelector(e.target.getAttribute('href'))
    modal.style.display = null
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModal)
    modal.querySelectorAll('.js-modal-close').forEach(e => {e.addEventListener('click', closeModal)})
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
    modalWrapperGalerie.style.display = null
    modalWrapperAjoutPhoto.style.display = 'none'
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault(e)
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null 
    location.reload();

}
 
const stopPropagation = function(e) {
    e.stopPropagation()
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})

window.addEventListener('keydown', function(e) {
    if (e.key === "Escape") {
        closeModal(e)
    }
})

// * Affichage des travaux dans la modale

const token = window.localStorage.getItem('token')
function suppressionWork() {
    
    const worksElements = document.querySelectorAll('.projet-liste figure i:nth-child(2n)')
    const worksElementsEfface = document.querySelectorAll('.projet-liste figure')
    
    for (let i = 0; i < worksElements.length; i++) {
        worksElements[i].addEventListener('click', async function (event) {
            const id = event.target.dataset.id
            const reponse = await fetch(`http://localhost:5678/api/works/${id}`, {
                method: "DELETE",
                headers: {Authorization: `Bearer ${token}`}
            })
        worksElementsEfface[i].remove()
        })   
    }
}



// Navigation aller et retour entre Gallerie et Aout Photo

const modalWrapperGalerie = document.querySelector('.modal-wrapper__galerie')
const modalWrapperAjoutPhoto = document.querySelector('.modal-wrapper__ajout-photo')

function pageAjoutPhoto() {
    const btnAjouterPhoto = document.querySelector('#ajout-photo')
    btnAjouterPhoto.addEventListener('click', function() {
        modalWrapperGalerie.style.display = "none"
        modalWrapperAjoutPhoto.style.display = null
    })
}
pageAjoutPhoto()

function retourGalerie() {
    const flecheRetour = document.querySelector('.fa-arrow-left')
    flecheRetour.addEventListener('click', function() {
        modalWrapperGalerie.style.display = null
        modalWrapperAjoutPhoto.style.display = 'none'
    })
}
retourGalerie()

//! Travaux en cours
let uploadButton = document.getElementById("upload-button");
let chosenImage = document.getElementById("chosen-image");
// let fileName = document.getElementById("file-name");

uploadButton.onchange = () => {
    let reader = new FileReader();
    reader.readAsDataURL(uploadButton.files[0]);
    reader.onload = () => {
        chosenImage.setAttribute("src",reader.result);
    }

    let aMasquer = document.querySelector('.a-masquer')
    aMasquer.style.display = "none"
    // fileName.textContent = uploadButton.files[0].name;
}

//! Fin de travaux en cours

//Affichage des travaux dans la modale
function modifWorks(works) {

    for (let i = 0; i < works.length; i++) {
    
        const figure = works[i]

        const projetListe = document.querySelector(".projet-liste")
        
        const workElement = document.createElement("figure")

        const edit = document.createElement('p')
        edit.innerText = 'éditer'

        const imageElement = document.createElement("img")
        imageElement.src = figure.imageUrl

        const iconMove = document.createElement('i')
        iconMove.classList.add('fa-solid', 'fa-arrows-up-down-left-right')

        const iconTrash = document.createElement('i')
        iconTrash.classList.add('fa-solid', 'fa-trash-can')
        iconTrash.dataset.id = figure.id
   
        projetListe.appendChild(workElement)
        workElement.appendChild(imageElement)
        workElement.append(edit)
        workElement.append(iconMove)
        workElement.append(iconTrash)
    }
    suppressionWork()
}
modifWorks(works)









