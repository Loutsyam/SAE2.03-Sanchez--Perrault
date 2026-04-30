let HOST_URL = "https://mmi.unilim.fr/~sanchezperrau1/SAE2.03-Sanchez--Perrault/";

let DataFavorite = {};

DataFavorite.add = async function(profileId, movieId) {
    let url = HOST_URL + "server/script.php?todo=addfavorite&profileId=" + profileId + "&movieId=" + movieId;
    let answer = await fetch(url);
    let data = await answer.json();
    return data;
}

DataFavorite.read = async function(profileId) {
    let url = HOST_URL + "server/script.php?todo=readfavorites&profileId=" + profileId;
    let answer = await fetch(url);
    let data = await answer.json();
    return data;
}

export { DataFavorite };
