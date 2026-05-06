let templateFile = await fetch("./component/NavBar/template.html");
let template = await templateFile.text();

let avatarTemplateFile = await fetch("./component/NavBar/avatarMini.template.html");
let avatarTemplate = await avatarTemplateFile.text();

let NavBar = {};

NavBar.format = function (profiles, activeProfile) {
  let html = template;
  html = html.replace("{{hAbout}}", "#");
  html = html.replace("{{hHome}}", "#");
  
  // Désactiver le bouton Favoris si aucun profil n'est sélectionné
  if (!activeProfile) {
    html = html.replace('onclick="C.handlerFavorites()"', 'onclick="alert(\'Veuillez sélectionner un profil d\'abord\')"');
  }

  // Afficher l'avatar du profil actif en utilisant le template
  let activeProfileHTML = "";
  if (activeProfile) {
    let avatarSrc = activeProfile.avatar ? '../server/images/' + activeProfile.avatar : '../server/images/icone_profile.png';
    activeProfileHTML = avatarTemplate.replaceAll('{{avatarSrc}}', avatarSrc).replaceAll('{{profileName}}', activeProfile.name);
  } else {
    activeProfileHTML = avatarTemplate.replaceAll('{{avatarSrc}}', '../server/images/icone_profile.png').replaceAll('{{profileName}}', 'Profil');
  }
  html = html.replace("{{activeProfileAvatar}}", activeProfileHTML);
  
  return html;
};

export { NavBar };
