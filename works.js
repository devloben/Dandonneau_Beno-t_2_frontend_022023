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

