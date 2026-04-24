import { MovieCard } from "../MovieCard/script.js";

let templateFile = await fetch('./component/MovieCategory/template.html');
let template = await templateFile.text();

let MovieCategory = {};

MovieCategory.format = function(categoryData, imageBaseUrl = './server/images/'){
    let html = template;
    html = html.replace('{{categoryName}}', categoryData.category);
    
    let moviesHTML = MovieCard.formatMany(categoryData.movies, imageBaseUrl);
    html = html.replace('{{moviesHTML}}', moviesHTML);
    
    return html;
}

MovieCategory.formatMany = function(categories, imageBaseUrl = './server/images/'){
    let html = '';
    for (const categoryData of categories) {
        html += MovieCategory.format(categoryData, imageBaseUrl);
    }
    return html;
}

export {MovieCategory};
