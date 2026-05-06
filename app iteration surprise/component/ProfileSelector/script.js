// Charge les templates HTML au démarrage (une seule fois)
let templateFileMain = await fetch('./component/ProfileSelector/template.html');
let templateMain = await templateFileMain.text();

let templateFileCard = await fetch('./component/ProfileSelector/profileCard.template.html');
let templateCard = await templateFileCard.text();

let ProfileSelector = {};

/**
 * Vue — Crée le HTML pour afficher les cartes de profils
 * @param {Array} profiles - Liste des profils à afficher
 * @returns {string} Code HTML à injecter dans la page
 */
ProfileSelector.format = function(profiles) {
  // Formate chaque carte profil en utilisant le template
  let profileCardsHTML = profiles.map(profile => {
    let html = templateCard;
    let avatarUrl = profile.avatar ? '../server/images/' + profile.avatar : '../server/images/icone_profile.png';
    
    html = html.replaceAll('{{profileId}}', profile.id);
    html = html.replaceAll('{{profileName}}', profile.name);
    html = html.replaceAll('{{profileAvatar}}', avatarUrl);
    
    return html;
  }).join("");
  
  // Utilise le template principal et injecte les cartes
  let html = templateMain;
  html = html.replace('{{profilesHTML}}', profileCardsHTML);
  
  return html;
};

/**
 * Attache les événements click aux cartes de profils
 * @param {Array} profiles - Liste des profils
 * @param {Function} onSelectProfile - Fonction appelée quand un profil est cliqué
 */
ProfileSelector.attachEvents = function(profiles, onSelectProfile) {
  // Récupère toutes les cartes de profils dans le DOM
  let cards = document.querySelectorAll(".profile-card");
  
  // Pour chaque carte, ajouter un écouteur de clic
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    
    card.addEventListener("click", function() {
      // Récupère l'ID du profil cliqué depuis l'attribut data-profile-id
      let profileId = this.getAttribute("data-profile-id");
      
      // Trouve l'objet profil correspondant à cet ID
      let selectedProfile = profiles.find(p => p.id == profileId);
      
      // Appelle la fonction du contrôleur pour traiter la sélection
      // onSelectProfile = C.selectProfile (passée en paramètre)
      onSelectProfile(selectedProfile);
    });
  }
};

export { ProfileSelector };
