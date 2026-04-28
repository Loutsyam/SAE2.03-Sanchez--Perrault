let HOST_URL = "https://mmi.unilim.fr/~sanchezperrau1/SAE2.03-Sanchez--Perrault/";

let DataProfile = {};

DataProfile.add = async function(fdata){
    let config = {
        method: "POST",
        body: fdata
    };
    let answer = await fetch(HOST_URL + "server/script.php?todo=addProfile", config);
    let data = await answer.json();
    return data;
}

DataProfile.getAll = async function(){
    // Envoie une requête HTTP au serveur pour obtenir tous les profils
    let answer = await fetch(HOST_URL + "server/script.php?todo=readProfiles");
    // Extrait les données au format JSON de la réponse
    let data = await answer.json();
    // Retourne les données des profils
    return data;
}

export {DataProfile};
