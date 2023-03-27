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