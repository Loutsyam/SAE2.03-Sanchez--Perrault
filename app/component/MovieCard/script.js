let templateFile = await fetch('./component/MovieCard/template.html');
let template = await templateFile.text();

let MovieCard = {};

MovieCard.format = function(movie, imageBaseUrl = './server/images/'){     let html = template;
    html = html.replaceAll('{{id}}', movie.id);
    html = html.replaceAll('{{title}}', movie.name);
    html = html.replaceAll('{{imageUrl}}', imageBaseUrl + movie.image);
    html = html.replaceAll('{{trailerUrl}}', movie.trailer);
    return html;
}

MovieCard.formatMany = function(movies, imageBaseUrl = './server/images/'){
    let html = '';
    for (const movie of movies) {
        html += MovieCard.format(movie, imageBaseUrl);
    }
    return html;
}

export {MovieCard};
