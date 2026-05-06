import { MovieCard } from "../MovieCard/script.js";

let templateFile = await fetch('./component/MovieCategory/template.html');
let template = await templateFile.text();

let MovieCategory = {};

MovieCategory.format = function(categoryData, imageBaseUrl = './server/images/', favoriteIds = [], isDisplayingFavorites = false){
    let html = template;
    
    html = html.replace('{{categoryName}}', categoryData.category);
    
    let moviesHTML = MovieCard.formatMany(categoryData.movies, imageBaseUrl, favoriteIds, isDisplayingFavorites);
    html = html.replace('{{moviesHTML}}', moviesHTML);
    
    return html;
}

MovieCategory.formatMany = function(categories, imageBaseUrl = './server/images/', favoriteIds = [], isDisplayingFavorites = false){
    let html = '';
    
    for (let i = 0; i < categories.length; i++) {
        let categoryData = categories[i];
        html = html + MovieCategory.format(categoryData, imageBaseUrl, favoriteIds, isDisplayingFavorites);
    }
    
    return html;
}

export {MovieCategory};

