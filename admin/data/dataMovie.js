let HOST_URL = "https://mmi.unilim.fr/~sanchezperrau1/SAE2.03-Sanchez--Perrault/";

let DataMovie = {};

DataMovie.add = async function(fdata){
    let config = {
        method: "POST",
        body: fdata
    };
    let answer = await fetch(HOST_URL + "server/script.php?todo=addMovie", config);
    let data = await answer.json();
    return data;
}

DataMovie.requestCategories = async function(){
    // Envoie une requête HTTP au serveur pour obtenir les catégories
    let answer = await fetch(HOST_URL + "server/script.php?todo=readcategories");
    // Extrait les données au format JSON de la réponse
    let data = await answer.json();
    // Retourne les données des catégories
    return data;
}

export {DataMovie};
