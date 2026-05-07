import { MovieCard } from "../MovieCard/script.js";

let templateFile = await fetch('./component/MovieCategory/template.html');
let template = await templateFile.text();

let MovieCategory = {};

MovieCategory.format = function(categoryData, imageBaseUrl = './server/images/', favoriteIds = [], isDisplayingFavorites = false, categoryIndex = 0){
    let html = template;
    
    html = html.replace('{{categoryName}}', categoryData.category);
    
    // Ajouter la classe de couleur basée sur l'index
    let colorClasses = ['color-white', 'color-pink', 'color-orange', 'color-yellow'];
    let colorClass = colorClasses[categoryIndex % colorClasses.length];
    html = html.replace('{{colorClass}}', colorClass);
    
    let moviesHTML = MovieCard.formatMany(categoryData.movies, imageBaseUrl, favoriteIds, isDisplayingFavorites);
    html = html.replace('{{moviesHTML}}', moviesHTML);
    
    return html;
}

MovieCategory.getCategorySquares = function(categories){
    let colorClasses = ['color-white', 'color-pink', 'color-orange', 'color-yellow'];
    let html = '<div class="category-squares">';
    
    for (let i = 0; i < categories.length; i++) {
        let colorClass = colorClasses[i % colorClasses.length];
        html = html + '<div class="category-square ' + colorClass + '">' + categories[i].category + '</div>';
    }
    
    html = html + '</div>';
    return html;
}

MovieCategory.formatMany = function(categories, imageBaseUrl = './server/images/', favoriteIds = [], isDisplayingFavorites = false){
    let html = '';
    
    html = html + MovieCategory.getCategorySquares(categories);
    
    for (let i = 0; i < categories.length; i++) {
        let categoryData = categories[i];
        html = html + MovieCategory.format(categoryData, imageBaseUrl, favoriteIds, isDisplayingFavorites, i);
    }
    
    return html;
}

export {MovieCategory};

