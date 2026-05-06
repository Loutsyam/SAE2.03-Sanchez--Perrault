// URL de base du serveur
let HOST_URL = "https://mmi.unilim.fr/~sanchezperrau1/SAE2.03-Sanchez--Perrault/";

// Modèle de données pour les profils
let DataProfile = {};

// Ajoute un nouveau profil
DataProfile.add = async function(fdata){
    let config = {
        method: "POST",
        body: fdata
    };
    let answer = await fetch(HOST_URL + "server/script.php?todo=addprofile", config);
    let data = await answer.json();
    return data;
}

// Modifie un profil existant
DataProfile.update = async function(fdata){
    let config = {
        method: "POST",
        body: fdata
    };
    let answer = await fetch(HOST_URL + "server/script.php?todo=updateprofile", config);
    let data = await answer.json();
    return data;
}

// Récupère tous les profils
// Utile pour remplir le formulaire de modification
DataProfile.getAll = async function(){
    let answer = await fetch(HOST_URL + "server/script.php?todo=readprofiles");
    let data = await answer.json();
    return data;
}

export {DataProfile};

