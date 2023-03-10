



//Modèle
//  Ajout de la fonction permettant d'envoyer un avis
// export function ajoutListenersEnvoyerAvis() {
//     const formulaireAvis = document.querySelector(".formulaire-avis")
//     formulaireAvis.addEventListener("submit", function(event) {
//         event.preventDefault()

        // Création d'un objet contenant le nouvel avis (la Charge Utile)
        // const avis = {
        //     pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
        //     utilisateur: event.target.querySelector("[name=utilisateur]").value,
        //     commentaire: event.target.querySelector("[name=commentaire]").value,
        //     nbEtoiles: parseInt(event.target.querySelector("[name=nbEtoiles]").value)
        // }
        

        // Conversion de la la Charge Utile au format JSON
        // const chargeUtile = JSON.stringify(avis)

        // Appel de la fontion fetch avec toutes les informations nécessaires
//         fetch("http://localhost:8081/avis", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: chargeUtile
//         })
//     })
// }
/*
<form class="formulaire-avis">
    Identifiant de la pièce :<br>
    <input type="number" name="piece-id"><br>
    Nom d'utilisateur :<br>
    <input type="text" name="utilisateur"><br>
    Avis :<br>
    <input type="text" name="commentaire"><br>
    Note :<br>
    <input type="number" name="nbEtoiles" min="0" max="5"><br>
    <button>Envoyer</button>
</form>
*/