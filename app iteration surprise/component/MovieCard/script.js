// Charge le template HTML au démarrage (une seule fois)
// Le template contient des placeholders comme {{id}}, {{title}}, etc.
let templateFile = await fetch('./component/MovieCard/template.html');
let template = await templateFile.text();

// Import de DataMovie pour récupérer les détails
import { DataMovie } from '../../data/dataMovie.js';

// Vue : composant pour afficher une carte film
let MovieCard = {};

// Template pour le contenu du hover avec les placeholders
let overlayTemplate = `
    <h3 class="movie-card__overlay-title">{{title}}</h3>
    <div class="movie-card__overlay-info">
        <p><strong>Réalisateur:</strong> <span>{{director}}</span></p>
        <p><strong>Année:</strong> <span>{{year}}</span></p>
        <p><strong>Catégorie:</strong> <span>{{category}}</span></p>
    </div>
    <div class="movie-card__overlay-description">
        <p>{{description}}</p>
    </div>
`;

// Délégation d'événements : écoute les hovers sur toutes les cartes
MovieCard.attachHoverListeners = function() {
    // Trouve toutes les cartes films
    let cards = document.querySelectorAll('.movie-card');
    
    // Pour chaque carte, ajoute un listener de hover
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        let movieId = card.getAttribute('data-id');
        
        // Ajoute l'événement mouseenter
        card.addEventListener('mouseenter', function() {
            // Charge les détails du film
            DataMovie.requestMovieDetails(movieId).then(details => {
                // Crée le HTML avec les placeholders
                let overlayHtml = overlayTemplate;
                
                // Remplace tous les placeholders par les vraies valeurs
                overlayHtml = overlayHtml.replaceAll('{{title}}', details.name || '--');
                overlayHtml = overlayHtml.replaceAll('{{director}}', details.director || '--');
                overlayHtml = overlayHtml.replaceAll('{{year}}', details.year || '--');
                overlayHtml = overlayHtml.replaceAll('{{category}}', details.category || '--');
                overlayHtml = overlayHtml.replaceAll('{{description}}', details.description || '--');
                
                // Trouve l'overlay content et met à jour son HTML
                let overlayContent = card.querySelector('.movie-card__overlay-content');
                if (overlayContent) {
                    overlayContent.innerHTML = overlayHtml;
                }
            });
        });
    }
};

// Formate UN film: remplace les placeholders par les vraies données
// movie = l'objet film avec ses infos (id, name, image, etc.)
// imageBaseUrl = chemin vers les images
// favoriteIds = liste des IDs des films favoris du profil
// isDisplayingFavorites = true si on affiche la page des favoris
MovieCard.format = function(movie, imageBaseUrl = './server/images/', favoriteIds = [], isDisplayingFavorites = false){
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
    
    // Gère l'affichage et l'action de l'étoile selon le contexte
    let etoile = '☆';
    let favoriteAction = `C.addFavorite('${movie.id}');`;
    let starDisplay = '';
    
    if (isDisplayingFavorites) {
        // Sur la page des favoris: affiche étoile pleine pour pouvoir enlever
        etoile = '⭐';
        favoriteAction = `C.removeFavorite('${movie.id}');`;
    } else {
        // Sur la page d'accueil: affiche étoile pleine si favori, vide sinon
        if (isFav) {
            etoile = '⭐';
            // Clic sur étoile pleine = retirer des favoris
            favoriteAction = `C.removeFavorite('${movie.id}');`;
        }
    }
    
    html = html.replaceAll('{{starIcon}}', etoile);
    html = html.replaceAll('{{favoriteAction}}', favoriteAction);
    html = html.replaceAll('{{starDisplay}}', starDisplay);
    
    // Retourne du HTML prêt à afficher
    return html;
}

// Formate PLUSIEURS films : appelle format() pour chacun et les concatène
MovieCard.formatMany = function(movies, imageBaseUrl = './server/images/', favoriteIds = [], isDisplayingFavorites = false){
    let html = '';
    
    // Pour chaque film, on formate et on ajoute au HTML
    for (let i = 0; i < movies.length; i++) {
        let movie = movies[i];
        html = html + MovieCard.format(movie, imageBaseUrl, favoriteIds, isDisplayingFavorites);
    }
    
    // Retourne tous les films formatés ensemble
    return html;
}

export {MovieCard};

