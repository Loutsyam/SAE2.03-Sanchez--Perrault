// URL où se trouve le répertoire "server" sur mmi.unilim.fr
let HOST_URL = "https://mmi.unilim.fr/~sanchezperrau1/SAE2.03-Sanchez--Perrault/";//"http://mmi.unilim.fr/~????"; // CHANGE THIS TO MATCH YOUR CONFIG

let DataMovie = {};

DataMovie.getHostUrl = function(){
    return HOST_URL;
}

DataMovie.requestMovies = async function(){
    // fetch permet d'envoyer une requête HTTP à l'URL spécifiée. 
    // L'URL est construite en concaténant HOST_URL à "/server/script.php?direction=" et la valeur de la variable dir. 
    // L'URL finale dépend de la valeur de HOST_URL et de dir.
    let answer = await fetch(HOST_URL + "server/script.php?todo=readmovies");
    // answer est la réponse du serveur à la requête fetch.
    // On utilise ensuite la méthode json() pour extraire de cette réponse les données au format JSON.
    // Ces données (data) sont automatiquement converties en objet JavaScript.
    let data = await answer.json();
    // Enfin, on retourne ces données.
    return data;
}

DataMovie.requestMovieDetails = async function(movieId){
    // Envoie une requête HTTP au serveur pour obtenir les détails d'un film
    let answer = await fetch(HOST_URL + "server/script.php?todo=readMovieDetail&id=" + movieId);
    // Extrait les données au format JSON de la réponse
    let data = await answer.json();
    // Retourne les données du film
    return data;
}

export {DataMovie};
