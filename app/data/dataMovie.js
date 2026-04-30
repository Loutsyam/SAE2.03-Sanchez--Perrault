// où pinger le serveur
let HOST_URL = "https://mmi.unilim.fr/~sanchezperrau1/SAE2.03-Sanchez--Perrault/";

let DataMovie = {};

DataMovie.getHostUrl = function(){
    return HOST_URL;
}

// cherche les films, avec option filtrage par âge
DataMovie.requestMovies = async function(age){
    let url = HOST_URL + "server/script.php?todo=readmovies";
    if (age !== null && age !== undefined) {
        url = url + "&age=" + age;
    }
    let answer = await fetch(url);
    let data = await answer.json();
    return data;
}

// récupère un film en particulier
DataMovie.requestMovieDetails = async function(movieId){
    let answer = await fetch(HOST_URL + "server/script.php?todo=readmoviedetail&id=" + movieId);
    let data = await answer.json();
    return data;
}

// ajoute un nouveau film
DataMovie.add = async function(formData){
    let config = {
        method: "POST",
        body: formData
    };
    let answer = await fetch(HOST_URL + "server/script.php?todo=addmovie", config);
    let data = await answer.json();
    return data;
}

export {DataMovie};

