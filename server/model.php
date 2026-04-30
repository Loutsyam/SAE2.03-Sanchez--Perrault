<?php

define("HOST", "localhost");
define("DBNAME", "sanchezperrau1");
define("DBLOGIN", "sanchezperrau1");
define("DBPWD", "sanchezperrau1");

function getConnection(){
    $dsn = "mysql:host=".HOST.";dbname=".DBNAME.";charset=utf8mb4";
    return new PDO($dsn, DBLOGIN, DBPWD);
}

function getAllMovies($minAge = null){
    $cnx = getConnection();
    
    // recupere les films avec leur catego, LEFT JOIN au cas où y en aurait pas
    $sql = "select m.id, m.name, m.image, m.trailer, c.name as category from Movie m LEFT JOIN Category c ON m.id_category = c.id";
    
    // filtre par age si y a la demande
    if ($minAge !== null) {
        $sql = $sql . " WHERE m.min_age <= :minAge";
    }
    
    // tri par catego + nom du film
    $sql = $sql . " ORDER BY c.name, m.name";
    
    // prepare la requete (protection contre les injections SQL)
    $stmt = $cnx->prepare($sql);
    
    // execute avec les bonnes valeurs
    if ($minAge !== null) {
        $stmt->execute(array(':minAge' => $minAge));
    } else {
        $stmt->execute();
    }
    
    // recupere tous les resultats et retour
    $films = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $films;
}

function insertMovie($title, $director, $year, $duration, $description, $categoryId, $image, $trailer, $ageRestriction){
    $cnx = getConnection();
    
    // verifie que la catego existe vraiment
    $sqlCategory = "SELECT id FROM Category WHERE id = :categoryId";
    $stmtCategory = $cnx->prepare($sqlCategory);
    $stmtCategory->execute(array(':categoryId' => $categoryId));
    $categoryResult = $stmtCategory->fetch(PDO::FETCH_OBJ);
    
    if (!$categoryResult) {
        return false;
    // conversion en int pour la restriction d'age
    }
    $minAge = intval($ageRestriction);
    
    $sql = "INSERT INTO Movie (name, director, year, length, description, id_category, image, trailer, min_age) 
            VALUES (:title, :director, :year, :duration, :description, :categoryId, :image, :trailer, :minAge)";
    
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
    $cnx = getConnection();
    $sql = "SELECT m.id, m.name, m.image, m.trailer, m.description, m.director, m.year, m.length, m.min_age, c.name as category 
            FROM Movie m 
            LEFT JOIN Category c ON m.id_category = c.id 
            WHERE m.id = :id";
    $stmt = $cnx->prepare($sql);
    $stmt->execute(array(':id' => $movieId));
    $res = $stmt->fetch(PDO::FETCH_OBJ);
    return $res;
}

function getAllCategories(){
    $cnx = getConnection();
    $sql = "SELECT id, name FROM Category ORDER BY name";
    $stmt = $cnx->prepare($sql);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res;
}

function getAllProfiles(){
    $cnx = getConnection();
    $sql = "SELECT id, name, avatar, min_age FROM UserProfile ORDER BY name";
    $stmt = $cnx->prepare($sql);
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res;
}


function insertProfile($name, $avatar, $minAge){
    $cnx = getConnection();
    
    $sql = "INSERT INTO UserProfile (name, avatar, min_age) 
            VALUES (:name, :avatar, :minAge)";
    
    $stmt = $cnx->prepare($sql);
    $result = $stmt->execute(array(
        ':name' => $name,
        ':avatar' => $avatar,
        ':minAge' => $minAge
    ));
    
    return $result;
}

function updateProfile($id, $name, $avatar, $minAge){
    $cnx = getConnection();
    
    $sql = "UPDATE UserProfile SET name = :name, avatar = :avatar, min_age = :minAge 
            WHERE id = :id";
    
    $stmt = $cnx->prepare($sql);
    
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':avatar', $avatar);
    $stmt->bindParam(':minAge', $minAge);
    
    $stmt->execute();
    
    $res = $stmt->rowCount();
    
    return $res;
}

function addFavorite($id_profile, $id_movie){
    $cnx = getConnection();
    
    // conversion en int pour securiser les parametres
    $id_profile = (int)$id_profile;
    $id_movie = (int)$id_movie;
    
    // verifie que le profil existe vraiment
    $sql = "SELECT id FROM UserProfile WHERE id = :id_profile";
    $stmt = $cnx->prepare($sql);
    $stmt->execute(array(':id_profile' => $id_profile));
    $profil = $stmt->fetch(PDO::FETCH_OBJ);
    
    if (!$profil) {
        return false;
    }
    
    // verifie que le film existe vraiment aussi
    $sql = "SELECT id FROM Movie WHERE id = :id_movie";
    $stmt = $cnx->prepare($sql);
    $stmt->execute(array(':id_movie' => $id_movie));
    $film = $stmt->fetch(PDO::FETCH_OBJ);
    
    if (!$film) {
        return false;
    }
    
    // verifie que c'est pas deja dans les favoris
    $sql = "SELECT id_profile FROM Favorite WHERE id_profile = :id_profile AND id_movie = :id_movie";
    $stmt = $cnx->prepare($sql);
    $stmt->execute(array(':id_profile' => $id_profile, ':id_movie' => $id_movie));
    $favori = $stmt->fetch(PDO::FETCH_OBJ);
    
    if ($favori) {
        // deja la
        return true;
    }
    
    // l'ajoute aux favoris
    $sql = "INSERT INTO Favorite (id_profile, id_movie) VALUES (:id_profile, :id_movie)";
    $stmt = $cnx->prepare($sql);
    $resultat = $stmt->execute(array(':id_profile' => $id_profile, ':id_movie' => $id_movie));
    
    return $resultat;
}

function getFavoritesByProfile($id_profile){
    $cnx = getConnection();
    
    // recupere les favoris avec les infos des films et categories
    $sql = "SELECT m.id, m.name, m.image, m.trailer, c.name as category 
            FROM Favorite f
            JOIN Movie m ON f.id_movie = m.id
            LEFT JOIN Category c ON m.id_category = c.id
            WHERE f.id_profile = :id_profile
            ORDER BY c.name, m.name";
    
    $stmt = $cnx->prepare($sql);
    $stmt->execute(array(':id_profile' => $id_profile));
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    
    return $res;
}


