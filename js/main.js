//* Récupération des travaux depuis le Backend et transformation au format JSON

const REPONSE = await fetch('http://localhost:5678/api/works')
const WORKS = await REPONSE.json()


//* Création d'une fonction permettant de rafraichir la liste des travaux

function initialiseWorks(WORKS) {

    // Affichage de l'ensemble des travaux
    for (let i = 0; i < WORKS.length; i++) {
        
        // Création d'une fiche pour chaque travaux
        const WORK = WORKS[i]

        // Récupération de l'élément du DOM qui accueillera les fiches
        const GALERIE = document.querySelector(".gallery")

        // Création d'une balise dédiée à une fiche
        const WORK_ELEM = document.createElement("figure")

        // Création du contenu des fiches
        const IMAGE_ELEM = document.createElement("img")
        IMAGE_ELEM.src = WORK.imageUrl
       
        const TITRE_ELEM = document.createElement("figcaption")
        TITRE_ELEM.innerText = WORK.title

        // Rattachement de la balise "figure" à la class "gallery"
        GALERIE.appendChild(WORK_ELEM)

        // Rattachement des éléments à la fiche
        WORK_ELEM.appendChild(IMAGE_ELEM)
        WORK_ELEM.appendChild(TITRE_ELEM)
    }
}

// Initialisation de l'affichage de la gallery
initialiseWorks(WORKS)

 
//* Création des filtres

const FILTRE_TOUS = document.querySelector("#tous")
FILTRE_TOUS.addEventListener("click", function() {
    const WORKS_FILTRE = WORKS.filter(function(work) {
        return work.id
    })
    initialiseWorks(WORKS_FILTRE)
})

const FILTRE_OBJETS = document.querySelector("#objets")
FILTRE_OBJETS.addEventListener("click", function () {
    const WORKS_FILTRE = WORKS.filter(function (work) {
        return work.categoryId == 1
    })
    document.querySelector(".gallery").innerHTML = ""
    initialiseWorks(WORKS_FILTRE)
})

const FILTRE_APPART = document.querySelector("#appartements")
FILTRE_APPART.addEventListener("click", function () {
    const WORKS_FILTRE = WORKS.filter(function (work) {
        return work.categoryId == 2
    })
    document.querySelector(".gallery").innerHTML = ""
    initialiseWorks(WORKS_FILTRE)
})

const FILTRE_HOTEL_RESTO = document.querySelector("#hotels-restaurants");
FILTRE_HOTEL_RESTO.addEventListener("click", function () {
    const WORKS_FILTRE = WORKS.filter(function (work) {
        return work.categoryId == 3
    })
    document.querySelector(".gallery").innerHTML = ""
    initialiseWorks(WORKS_FILTRE)
})


//* Mise en page utilisateur authentifié

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

//* Vérifie si un utilisateur est authentifié et affiche la mise en page correspondante

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


// * Boite Modale

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

const CLOSE_MODAL = function (e) {
    if (modal === null) return
    e.preventDefault(e)
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', CLOSE_MODAL)
    modal.querySelector('.js-modal-close').removeEventListener('click', CLOSE_MODAL)
    modal.querySelector('.js-modal-stop').removeEventListener('click', STOP_PROPAGATION)
    modal = null 
    location.reload();
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

const MODAL_GALERIE = document.querySelector('.modal-wrapper__galerie')
const MODAL_AJOUT_PHOTO = document.querySelector('.modal-wrapper__ajout-photo')

function pageAjoutPhoto() {
    const BTN_AJOUTER_PHOTO = document.querySelector('#ajout-photo')
    BTN_AJOUTER_PHOTO.addEventListener('click', function() {
        MODAL_GALERIE.style.display = "none"
        MODAL_AJOUT_PHOTO.style.display = null
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


//* Affichage des travaux dans la modale

function modalWorks(WORKS) {

    for (let i = 0; i < WORKS.length; i++) {
    
        const WORK = WORKS[i]

        const WORK_LISTE = document.querySelector(".projet-liste")
        
        const WORK_ELEM = document.createElement("figure")

        const EDIT = document.createElement('p')
        EDIT.innerText = 'éditer'

        const IMAGE_ELEM = document.createElement("img")
        IMAGE_ELEM.src = WORK.imageUrl

        const ICONE_MOVE = document.createElement('i')
        ICONE_MOVE.classList.add('fa-solid', 'fa-arrows-up-down-left-right')

        const ICONE_TRASH = document.createElement('i')
        ICONE_TRASH.classList.add('fa-solid', 'fa-trash-can')
        ICONE_TRASH.dataset.id = WORK.id
   
        WORK_LISTE.appendChild(WORK_ELEM)
        WORK_ELEM.appendChild(IMAGE_ELEM)
        WORK_ELEM.append(EDIT)
        WORK_ELEM.append(ICONE_MOVE)
        WORK_ELEM.append(ICONE_TRASH)
    }
    suppressionWork()
}
modalWorks(WORKS)


// * Suppression des travaux dans la modale

const TOKEN = window.localStorage.getItem('token')

function suppressionWork() {
    
    const worksElements = document.querySelectorAll('.projet-liste figure i:nth-child(2n)')
    const worksElementsEfface = document.querySelectorAll('.projet-liste figure')
    
    for (let i = 0; i < worksElements.length; i++) {
        worksElements[i].addEventListener('click', async function (event) {
            const id = event.target.dataset.id
            const reponse = await fetch(`http://localhost:5678/api/works/${id}`, {
                method: "DELETE",
                headers: {Authorization: `Bearer ${TOKEN}`}
            })
        worksElementsEfface[i].remove()
        })   
    }
}

//! Travaux en cours

//* Formulaire de chargement de nouvelle photo

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


// * Plan d'action
// Faire en sorte que le formualire ne soit pas actif tant que les 3 champs ne sont pas remplis
//Récupérer les données pour construire la requête.

//Test Photo
let photo = document.getElementById('upload-button')
photo.addEventListener('input', function() {
    photoValid(this)

})
let photoValid = function(saisiePhoto) {
    let testPhoto = saisiePhoto.files[0]

    let msgPhoto = document.getElementById('photoErreur')

    if (testPhoto) {
        msgPhoto.style.display = 'none'
        return true
        } else {
        msgPhoto.style.display = 'block'
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
    let msgTitre = document.getElementById('titreErreur')

    if (testTitre) {
        msgTitre.style.display = 'none'
        return true
        } else {
        msgTitre.style.display = 'block'
        msgTitre.style.color = 'red'
        return false
        }
}

//Test Catégorie
let categorie = document.getElementById('categorie-select')
categorie.addEventListener('input', function() {
    categorieValid(this)
})

let categorieValid = function(saisieCategorie) {
    let msgCategorie = document.getElementById('categorieErreur')
    
    if (saisieCategorie.value != "") {
        msgCategorie.style.display = 'none'
        return true
        } else {
            msgCategorie.style.display = 'block'
            msgCategorie.style.color = 'red'
        return false
        }
}

// TODO Variables à déclarer au début
const formAjoutPhoto = document.getElementById('form-ajout-photo')


// Modif bouton formulaire
const btnValiderPhoto = document.getElementById('valider-photo')
formAjoutPhoto.addEventListener('input', function() {

    if (titreValid(titre) && categorieValid(categorie) && photoValid(photo)) {
        btnValiderPhoto.classList.add('valider-photo-ok')

        formAjoutPhoto.addEventListener('submit', envoyerPhoto)


    } else {
        btnValiderPhoto.classList.remove('valider-photo-ok')
    }
})

// ! Envoi du formulaire Ajout Photo

// Validation du formulaire, construction de la requête serveur
async function envoyerPhoto(e) {
    e.preventDefault()

    const titre = document.getElementById('titre').value
    const image = document.getElementById('upload-button').files[0]
    const categorie = document.getElementById('categorie-select').value
    
    const formData = new FormData()
    formData.append('title', titre)
    formData.append('image', image)
    formData.append('category', categorie)

const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: { "Authorization": `Bearer ${TOKEN}` }, 
        body: formData
        })
}




//* Test Photo



//* Envoi de la nouvelle photo


//! Fin de travaux en cours


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









