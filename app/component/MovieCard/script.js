// Charge le template HTML au démarrage (une seule fois)
// Le template contient des placeholders comme {{id}}, {{title}}, etc.
let templateFile = await fetch('./component/MovieCard/template.html');
let template = await templateFile.text();

// Vue : composant pour afficher une carte film
let MovieCard = {};

// Formate UN film: remplace les placeholders par les vraies données
// movie = l'objet film avec ses infos (id, name, image, etc.)
// imageBaseUrl = chemin vers les images
// favoriteIds = liste des IDs des films favoris du profil
MovieCard.format = function(movie, imageBaseUrl = './server/images/', favoriteIds = []){
    // Commence avec le template original (HTML avec placeholders)
    let html = template;
    
    // Remplace tous les placeholders par les vraies valeurs
    // replaceAll = remplace toutes les occurrences du placeholder
    html = html.replaceAll('{{id}}', movie.id);
    html = html.replaceAll('{{title}}', movie.name);
    html = html.replaceAll('{{imageUrl}}', imageBaseUrl + movie.image);
    html = html.replaceAll('{{trailerUrl}}', movie.trailer);
    
    // Détermine si ce film est dans les favoris du profil
    let isFav = favoriteIds.includes(movie.id);
    
    // Affiche une étoile pleine si favori, vide sinon
    let etoile = '☆';
    if (isFav) {
        etoile = '⭐';
    }
    html = html.replaceAll('{{starIcon}}', etoile);
    
    // Retourne du HTML prêt à afficher
    return html;
}

// Formate PLUSIEURS films : appelle format() pour chacun et les concatène
MovieCard.formatMany = function(movies, imageBaseUrl = './server/images/', favoriteIds = []){
    let html = '';
    
    // Pour chaque film, on formate et on ajoute au HTML
    for (let i = 0; i < movies.length; i++) {
        let movie = movies[i];
        html = html + MovieCard.format(movie, imageBaseUrl, favoriteIds);
    }
    
    // Retourne tous les films formatés ensemble
    return html;
}

export {MovieCard};

