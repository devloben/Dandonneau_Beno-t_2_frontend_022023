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
initialiseWorks(works);

 
//* Création des filtres

// Tous
const filtreTous = document.querySelector("#tous")

filtreTous.addEventListener("click", function() {
    const worksTous = works.filter(function(work) {
        return work.id
    })
    initialiseWorks(worksTous)
})

// Objets
const filtreObjets = document.querySelector("#objets")

filtreObjets.addEventListener("click", function () {
    const worksFiltres = works.filter(function (work) {
        return work.categoryId == 1
    })
    document.querySelector(".gallery").innerHTML = ""
    initialiseWorks(worksFiltres)
})
// Appartements
const filtreAppartements = document.querySelector("#appartements")

filtreAppartements.addEventListener("click", function () {
    const worksFiltres = works.filter(function (work) {
        return work.categoryId == 2
    })
    document.querySelector(".gallery").innerHTML = ""
    initialiseWorks(worksFiltres)
})

// Hôtels & Restaurants
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

// function lienModifier() {
//     const imageAccueil = document.querySelector('#introduction figure')
//     const lienModifier = document.createElement('a')
//     lienModifier.setAttribute('href', '#modal1')
//     lienModifier.classList.add('js-modal')
//     lienModifier.innerHTML = '<i class="fa-solid fa-pen-to-square fa-lg"></i> Modifier' 

//     const mesProjets = document.querySelector('.mes-projets')
//     const lienModal = document.createElement('a')
//     lienModal.setAttribute('href', '#modal1')
//     lienModal.classList.add('js-modal')
//     lienModal.innerHTML = '<i class="fa-solid fa-pen-to-square fa-lg"></i> Modifier'

//     imageAccueil.append(lienModifier)
//     mesProjets.append(lienModal)
// }

function liensModifier(position, lien) {
    const choixPosition = document.querySelector(position)
    const choixLien = document.createElement('a')
    choixLien.setAttribute('href', lien)
    choixLien.classList.add('js-modal')
    choixLien.innerHTML = '<i class="fa-solid fa-pen-to-square fa-lg"></i> Modifier'

    choixPosition.append(choixLien)
}

// Affiche les éléments de modification
function utilisateurAuthentifie () {
    if (localStorage.getItem('userId') && localStorage.getItem('token')) {

        barreNoire()

        const logOut = document.querySelector('nav ul li:nth-child(3n) a')
        logOut.innerText = 'logout'
        logOut.setAttribute('href', '#')

        const filtres = document.querySelector('#portfolio ul')
        filtres.style.display = 'none'

        liensModifier('#introduction figure', '#')
        liensModifier('.mes-projets', '#modal1')
    }
}
utilisateurAuthentifie()

function deconnexion() {
    const logIn = document.querySelector('nav ul li:nth-child(3n) a')
    logIn.innerText = 'login'
    
    localStorage.removeItem('userId')
    localStorage.removeItem('token')

    window.location.href = './auth/login.html'
}
document.querySelector('nav ul li:nth-child(3n) a').addEventListener('click', deconnexion)





// * Boite Modale

let modal = null
const openModal = function(e) {
    e.preventDefault() 
    modal = document.querySelector(e.target.getAttribute('href'))
    modal.style.display = null
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault(e)
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click, closeModal')
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
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
   
        projetListe.appendChild(workElement)
        workElement.appendChild(imageElement)
        workElement.append(edit)
        workElement.append(iconMove)
        workElement.append(iconTrash)
    }
}
modifWorks(works)






