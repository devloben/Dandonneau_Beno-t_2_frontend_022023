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