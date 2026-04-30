let templateFile = await fetch("./component/NavBar/template.html");
let template = await templateFile.text();

let NavBar = {};

NavBar.format = function (profiles, activeProfile) {
  let html = template;
  html = html.replace("{{hAbout}}", "#");
  html = html.replace("{{hHome}}", "#");
  
  // Désactiver le bouton Favoris si aucun profil n'est sélectionné
  if (!activeProfile) {
    html = html.replace('onclick="C.handlerFavorites()"', 'onclick="alert(\'Veuillez sélectionner un profil d\'abord\')"');
  }

  // Afficher l'avatar du profil actif
  let activeProfileHTML = "";
  if (activeProfile) {
    let avatarSrc = activeProfile.avatar ? '../server/images/' + activeProfile.avatar : '../server/images/icone_profile.png';
    activeProfileHTML = `<img src="${avatarSrc}" alt="${activeProfile.name}" class="profile-avatar-mini" title="${activeProfile.name}" onclick="V.renderProfileSelection(C.allProfiles)" style="cursor: pointer;">`;
  } else {
    activeProfileHTML = `<img src="../server/images/icone_profile.png" alt="Profil" class="profile-avatar-mini" title="Profil" onclick="V.renderProfileSelection(C.allProfiles)" style="cursor: pointer;">`;
  }
  html = html.replace("{{activeProfileAvatar}}", activeProfileHTML);
  
  return html;
};

export { NavBar };
