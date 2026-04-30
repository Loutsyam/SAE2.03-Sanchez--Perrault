let ProfileSelector = {};

/**
 * Vue — Crée le HTML pour afficher les cartes de profils
 * @param {Array} profiles - Liste des profils à afficher
 * @returns {string} Code HTML à injecter dans la page
 */
ProfileSelector.format = function(profiles) {
  // Crée une carte de profil pour chaque profil dans la liste
  // .map() = transforme chaque profil en HTML
  let profileCardsHTML = profiles.map(profile => 
    `<div class="profile-card" data-profile-id="${profile.id}">
      <div class="profile-card-avatar">
        <img src="${profile.avatar ? '../server/images/' + profile.avatar : '../server/images/icone_profile.png'}" 
             alt="${profile.name}" 
             style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
      </div>
      <div class="profile-card-name">${profile.name}</div>
    </div>`
  ).join("");
  
  // Retourne le HTML complet prêt à afficher
  return `<div class="profile-selection-container">
    <h1 class="profile-selection-title">Qui va partir à l'aventure ?</h1>
    <div class="profiles-grid">
      ${profileCardsHTML}
    </div>
  </div>`;
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
