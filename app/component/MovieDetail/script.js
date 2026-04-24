let templateFile = await fetch('./component/MovieDetail/template.html');
let template = await templateFile.text();

let MovieDetail = {};

MovieDetail.format = function(movie, imageBaseUrl = './server/images/'){
    let html = template;
    html = html.replaceAll('{{id}}', movie.id);
    html = html.replaceAll('{{title}}', movie.name);
    html = html.replaceAll('{{imageUrl}}', imageBaseUrl + movie.image);
    html = html.replaceAll('{{trailerUrl}}', movie.trailer);
    html = html.replaceAll('{{description}}', movie.description);
    html = html.replaceAll('{{director}}', movie.director);
    html = html.replaceAll('{{year}}', movie.year);
    html = html.replaceAll('{{category}}', movie.category);
    html = html.replaceAll('{{minAge}}', movie.min_age);
    return html;
}

export {MovieDetail};
