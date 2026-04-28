<?php

/** ARCHITECTURE PHP SERVEUR  : Rôle du fichier controller.php
 * 
 *  Dans ce fichier, on va définir les fonctions de contrôle qui vont traiter les requêtes HTTP.
 *  Les requêtes HTTP sont interprétées selon la valeur du paramètre 'todo' de la requête (voir script.php)
 *  Pour chaque valeur différente, on déclarera une fonction de contrôle différente.
 * 
 *  Les fonctions de contrôle vont éventuellement lire les paramètres additionnels de la requête, 
 *  les vérifier, puis appeler les fonctions du modèle (model.php) pour effectuer les opérations
 *  nécessaires sur la base de données.
 *  
 *  Si la fonction échoue à traiter la requête, elle retourne false (mauvais paramètres, erreur de connexion à la BDD, etc.)
 *  Sinon elle retourne le résultat de l'opération (des données ou un message) à includre dans la réponse HTTP.
 */

/** Inclusion du fichier model.php
 *  Pour pouvoir utiliser les fonctions qui y sont déclarées et qui permettent
 *  de faire des opérations sur les données stockées en base de données.
 */
require("model.php");


function readMoviesController(){
    $movies = getAllMovies();
    
    // Grouper les films par catégorie avec array_reduce
    $grouped = array_reduce($movies, function($acc, $movie) {
        $cat = $movie->category ?: 'Sans catégorie';
        $acc[$cat][] = $movie;
        return $acc;
    }, []);
    
    // Convertir en tableau indexé avec array_map
    return array_map(fn($cat, $films) => ['category' => $cat, 'movies' => $films], array_keys($grouped), array_values($grouped));
}

function addMovieController(){
    /* Lecture des données de formulaire
       On ne vérifie pas si les données sont valides, on suppose que le client les a déjà
       vérifiées avant de les envoyer 
    */
    $title = $_POST['title'];
    $director = $_POST['director'];
    $year = $_POST['year'];
    $duration = $_POST['duration'];
    $description = $_POST['description'];
    $categoryId = $_POST['category'];
    $image = $_POST['image'];
    $trailer = $_POST['trailer'];
    $ageRestriction = $_POST['ageRestriction'];
    
    // Insertion du film à l'aide de la fonction insertMovie décrite dans model.php
    $ok = insertMovie($title, $director, $year, $duration, $description, $categoryId, $image, $trailer, $ageRestriction);
    
    // $ok est true ou false selon le résultat de l'insertion dans la BDD
    if ($ok != false){
        return "Le film " . $title . " a été ajouté avec succès";
    }
    else{
        return false;
    }
}

function readMovieDetailController(){
    // Récupérer l'ID du film depuis les paramètres de la requête
    $movieId = isset($_REQUEST['id']) ? trim($_REQUEST['id']) : '';
    
    // Valider que l'ID est fourni et est un nombre
    if (empty($movieId) || !is_numeric($movieId)) {
        return false;
    }
    
    // Récupérer les détails du film
    $movie = getMovieDetails($movieId);
    
    // Retourner le film (peut être false si le film n'existe pas)
    return $movie;
}

function readCategoriesController(){
    // Récupérer toutes les catégories
    $categories = getAllCategories();
    
    // Retourner les catégories
    return $categories;
}

/**
 * Contrôleur pour lire tous les profils utilisateurs.
 * @return array Les profils utilisateurs ou false en cas d'erreur.
 */
function readProfilesController(){
    // Récupérer tous les profils
    $profiles = getAllProfiles();
    
    // Retourner les profils
    return $profiles;
}

/**
 * Contrôleur pour ajouter un nouveau profil utilisateur.
 * @return string|false Un message de confirmation ou false en cas d'erreur.
 */
function addProfileController(){
    /* Lecture des données de formulaire
       On ne vérifie pas si les données sont valides, on suppose que le client les a déjà
       vérifiées avant de les envoyer 
    */
    $name = $_POST['name'];
    $avatar = $_POST['avatar'];
    $minAge = $_POST['minAge'];
    
    // Insertion du profil à l'aide de la fonction insertProfile décrite dans model.php
    $ok = insertProfile($name, $avatar, $minAge);
    
    // $ok est true ou false selon le résultat de l'insertion dans la BDD
    if ($ok != false){
        return "Le profil " . $name . " a été ajouté avec succès";
    }
    else{
        return false;
    }
}