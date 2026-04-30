// où pinger le serveur
let HOST_URL = "https://mmi.unilim.fr/~sanchezperrau1/SAE2.03-Sanchez--Perrault/";

let DataMovie = {};

// récupère les catégories pour le select du formulaire
DataMovie.requestCategories = async function(){
    let answer = await fetch(HOST_URL + "server/script.php?todo=readcategories");
    let data = await answer.json();
    return data;
}

// envoie un nouveau film
DataMovie.add = async function(fdata){
    let config = {
        method: "POST",
        body: fdata
    };
    let answer = await fetch(HOST_URL + "server/script.php?todo=addmovie", config);
    let data = await answer.json();
    return data;
}

export {DataMovie};

