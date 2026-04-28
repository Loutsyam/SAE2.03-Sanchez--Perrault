<?php
/**
 * Ce fichier contient toutes les fonctions qui réalisent des opérations
 * sur la base de données, telles que les requêtes SQL pour insérer, 
 * mettre à jour, supprimer ou récupérer des données.
 */

/**
 * Définition des constantes de connexion à la base de données.
 *
 * HOST : Nom d'hôte du serveur de base de données, ici "localhost".
 * DBNAME : Nom de la base de données
 * DBLOGIN : Nom d'utilisateur pour se connecter à la base de données.
 * DBPWD : Mot de passe pour se connecter à la base de données.
 */
define("HOST", "localhost");
define("DBNAME", "sanchezperrau1");
define("DBLOGIN", "sanchezperrau1");
define("DBPWD", "sanchezperrau1");


function getAllMovies(){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour récupérer les films avec leur catégorie
    $sql = "select m.id, m.name, m.image, m.trailer, c.name as category from Movie m LEFT JOIN Category c ON m.id_category = c.id ORDER BY c.name, m.name";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    // Exécute la requête SQL
    $stmt->execute();
    // Récupère les résultats de la requête sous forme d'objets
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; // Retourne les résultats
}

function insertMovie($title, $director, $year, $duration, $description, $categoryId, $image, $trailer, $ageRestriction){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    
    // Valider que l'ID de la catégorie existe
    $sqlCategory = "SELECT id FROM Category WHERE id = :categoryId";
    $stmtCategory = $cnx->prepare($sqlCategory);
    $stmtCategory->execute(array(':categoryId' => $categoryId));
    $categoryResult = $stmtCategory->fetch(PDO::FETCH_OBJ);
    
    if (!$categoryResult) {
        return false;
    }
    $minAge = intval($ageRestriction);
    
    // Requête SQL pour insérer un film
    $sql = "INSERT INTO Movie (name, director, year, length, description, id_category, image, trailer, min_age) 
            VALUES (:title, :director, :year, :duration, :description, :categoryId, :image, :trailer, :minAge)";
    
    // Prépare et exécute la requête SQL
    $stmt = $cnx->prepare($sql);
    $result = $stmt->execute(array(
        ':title' => $title,
        ':director' => $director,
        ':year' => $year,
        ':duration' => $duration,
        ':description' => $description,
        ':categoryId' => $categoryId,
        ':image' => $image,
        ':trailer' => $trailer,
        ':minAge' => $minAge
    ));
    
    return $result;
}

function getMovieDetails($movieId){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour récupérer les détails du film avec le nom de la catégorie
    $sql = "SELECT m.id, m.name, m.image, m.trailer, m.description, m.director, m.year, m.length, m.min_age, c.name as category 
            FROM Movie m 
            LEFT JOIN Category c ON m.id_category = c.id 
            WHERE m.id = :id";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    // Exécute la requête SQL avec l'ID du film
    $stmt->execute(array(':id' => $movieId));
    // Récupère le résultat de la requête sous forme d'objet
    $res = $stmt->fetch(PDO::FETCH_OBJ);
    return $res; // Retourne le résultat (peut être false si le film n'existe pas)
}

function getAllCategories(){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour récupérer toutes les catégories
    $sql = "SELECT id, name FROM Category ORDER BY name";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    // Exécute la requête SQL
    $stmt->execute();
    // Récupère les résultats sous forme d'objets
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; // Retourne les catégories
}

/**
 * Récupère tous les profils utilisateurs de la base de données.
 * @return array Un tableau d'objets contenant les profils utilisateurs.
 */
function getAllProfiles(){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour récupérer tous les profils
    $sql = "SELECT id, name, avatar, min_age FROM UserProfile ORDER BY name";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    // Exécute la requête SQL
    $stmt->execute();
    // Récupère les résultats sous forme d'objets
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; // Retourne les profils
}

/**
 * Insère un nouveau profil utilisateur dans la base de données.
 * @param string $name Le nom du profil.
 * @param string $avatar Le fichier avatar/image (facultatif).
 * @param int $minAge La restriction d'âge pour le profil.
 * @return bool true si l'insertion a réussi, false sinon.
 */
function insertProfile($name, $avatar, $minAge){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    
    // Requête SQL pour insérer un profil
    $sql = "INSERT INTO UserProfile (name, avatar, min_age) 
            VALUES (:name, :avatar, :minAge)";
    
    // Prépare et exécute la requête SQL
    $stmt = $cnx->prepare($sql);
    $result = $stmt->execute(array(
        ':name' => $name,
        ':avatar' => $avatar,
        ':minAge' => $minAge
    ));
    
    return $result;
}