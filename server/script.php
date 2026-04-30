<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', '/tmp/php_errors.log');

require("controller.php");

if (isset($_REQUEST['todo'])){
  // repond en JSON
  header('Content-Type: application/json');

  $todo = $_REQUEST['todo'];

  // routeur : execute le bon controleur selon l'action demandee
  switch($todo){
    case 'readmovies':
      $data = readMoviesController();
      break;
    case 'readmoviedetail':
      $data = readMovieDetailController();
      break;
    case 'readcategories':
      $data = readCategoriesController();
      break;
    case 'addmovie':
      $data = addMovieController();
      break;
    case 'readprofiles':
      $data = readProfilesController();
      break;
    case 'addprofile':
      $data = addProfileController();
      break;
    case 'updateprofile':
      $data = updateProfileController();
      break;
    case 'addfavorite':
      $data = addFavoriteController();
      break;
    case 'readfavorites':
      $data = readFavoritesController();
      break;
    default:
      // action non supportee
      echo json_encode('[error] Unknown todo value');
      http_response_code(400);
      exit();
  }

  // verifie que le controleur n'a pas retourne d'erreur
  if ($data===false){
    echo json_encode('[error] Controller returns false');
    http_response_code(500);
    exit();
  }

  // envoie la reponse en succes
  echo json_encode($data);
  http_response_code(200);
  exit();
} else {
  // parametre 'todo' manquant
  http_response_code(404);
}



