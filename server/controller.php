<?php

require("model.php");

function readMoviesController(){
    // recupere et securise l'age si y en a un
    $age = null;
    if (isset($_REQUEST['age'])) {
        $age = (int)$_REQUEST['age'];
    }
    
    // je recupere les films de la DB
    $films = getAllMovies($age);
    
    // y'a les films regroupes par categorie pour que ce soit plus clean au frontend
    $grouped = array();
    for ($i = 0; $i < count($films); $i++) {
        $film = $films[$i];
        $category = $film->category;
        
        // remplace les categos vides par un truc par defaut
        if ($category == null || $category == '') {
            $category = 'Sans catégorie';
        }
        
        // cree le groupe si y existe pas encore
        if (!isset($grouped[$category])) {
            $grouped[$category] = array();
        }
        
        // ajoute le film dans sa categorie
        $grouped[$category][] = $film;
    }
    
    // formatte les donnees comme le frontend l'attend
    $result = array();
    foreach ($grouped as $category => $films_cat) {
        $result[] = array('category' => $category, 'movies' => $films_cat);
    }
    
    return $result;
}

function addMovieController(){
    // verifie que tous les params sont la
    if (!isset($_POST['title']) || !isset($_POST['director']) || !isset($_POST['year']) || 
        !isset($_POST['duration']) || !isset($_POST['description']) || !isset($_POST['category']) ||
        !isset($_POST['image']) || !isset($_POST['trailer']) || !isset($_POST['ageRestriction'])) {
        return false;
    }
    
    // recupere les donnees du formulaire
    $title = $_POST['title'];
    $director = $_POST['director'];
    $year = $_POST['year'];
    $duration = $_POST['duration'];
    $description = $_POST['description'];
    $categoryId = $_POST['category'];
    $image = $_POST['image'];
    $trailer = $_POST['trailer'];
    $ageRestriction = $_POST['ageRestriction'];
    
    // verifie que ca s'est bien passe
    $ok = insertMovie($title, $director, $year, $duration, $description, $categoryId, $image, $trailer, $ageRestriction);
    
    if ($ok != false){
        return "Le film " . $title . " a été ajouté avec succès";
    }
    else{
        return false;
    }
}

function readMovieDetailController(){
    // recupere l'id du film demand
    $movieId = isset($_REQUEST['id']) ? trim($_REQUEST['id']) : '';
    
    // verifie que l'id c'est bien un truc valide
    if (empty($movieId) || !is_numeric($movieId)) {
        return false;
    }
    
    // va chercher les details
    $movie = getMovieDetails($movieId);
    
    return $movie;
}

function readCategoriesController(){
    $categories = getAllCategories();
    
    return $categories;
}

function readProfilesController(){
    $profiles = getAllProfiles();
    
    return $profiles;
}

function addProfileController(){
    if (!isset($_POST['name']) || !isset($_POST['avatar']) || !isset($_POST['minAge'])) {
        return false;
    }
    
    $name = $_POST['name'];
    $avatar = $_POST['avatar'];
    $minAge = $_POST['minAge'];
    
    $ok = insertProfile($name, $avatar, $minAge);
    
    if ($ok != false){
        return "Le profil " . $name . " a été ajouté avec succès";
    }
    else{
        return false;
    }
}

function updateProfileController(){
    if (!isset($_POST['id']) || !isset($_POST['name']) || !isset($_POST['avatar']) || !isset($_POST['minAge'])) {
        return false;
    }
    
    $id = $_POST['id'];
    $name = $_POST['name'];
    $avatar = $_POST['avatar'];
    $minAge = $_POST['minAge'];
    
    $ok = updateProfile($id, $name, $avatar, $minAge);
    
    if ($ok != false){
        return "Le profil " . $name . " a été modifié avec succès";
    }
    else{
        return false;
    }
}

function addFavoriteController(){
    if (!isset($_REQUEST['profileId']) || !isset($_REQUEST['movieId'])) {
        return false;
    }
    
    $id_profile = trim($_REQUEST['profileId']);
    $id_movie = trim($_REQUEST['movieId']);
    
    if (empty($id_profile) || !is_numeric($id_profile) || empty($id_movie) || !is_numeric($id_movie)) {
        return false;
    }
    
    $ok = addFavorite($id_profile, $id_movie);
    
    if ($ok != false){
        return array('message' => 'Le film a été ajouté à vos favoris.');
    }
    else{
        return false;
    }
}

function readFavoritesController(){
    $id_profile = isset($_REQUEST['profileId']) ? trim($_REQUEST['profileId']) : '';
    
    if (empty($id_profile) || !is_numeric($id_profile)) {
        return false;
    }
    
    $favorites = getFavoritesByProfile($id_profile);
    
    return $favorites;
}


