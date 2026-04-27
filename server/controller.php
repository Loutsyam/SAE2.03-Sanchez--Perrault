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
    
    // Grouper les films par catégorie
    $moviesByCategory = array();
    foreach ($movies as $movie) {
        $category = $movie->category ? $movie->category : 'Sans catégorie';
        if (!isset($moviesByCategory[$category])) {
            $moviesByCategory[$category] = array();
        }
        $moviesByCategory[$category][] = $movie;
    }
    
    // Convertir en tableau indexé pour un meilleur format JSON
    $result = array();
    foreach ($moviesByCategory as $category => $films) {
        $result[] = array(
            'category' => $category,
            'movies' => $films
        );
    }
    
    return $result;
}

function addMovieController(){
    // Récupérer les données du formulaire
    $fields = ['title', 'director', 'year', 'duration', 'description', 'category', 'image', 'trailer', 'ageRestriction'];
    $data = [];
    
    foreach ($fields as $field) {
        $data[$field] = isset($_POST[$field]) ? trim($_POST[$field]) : '';
        if (empty($data[$field])) {
            return false;
        }
    }
    
    // Ajouter le film à la base de données
    $result = insertMovie(
        $data['title'], $data['director'], $data['year'], $data['duration'],
        $data['description'], $data['category'], $data['image'], $data['trailer'], $data['ageRestriction']
    );
    
    return $result ? "Le film " . $data['title'] . " a été ajouté avec succès" : false;
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