let templateFile = await fetch('./component/ProfileUpdate/template.html');
let template = await templateFile.text();

let ProfileUpdate = {};

/**
 * Génère le HTML du formulaire avec la liste des profils
 */
ProfileUpdate.format = function(profiles, handler){
    let html = template;
    
    // Créer les options pour le select
    let profileOptions = '';
    for (let i = 0; i < profiles.length; i++) {
        let profile = profiles[i];
        profileOptions += `<option value="${profile.id}" data-name="${profile.name}" data-avatar="${profile.avatar}" data-minAge="${profile.min_age}">${profile.name}</option>`;
    }
    
    // Remplacer les placeholders
    html = html.replace('{{profileOptions}}', profileOptions);
    html = html.replace('{{handler}}', handler);
    return html;
}

/**
 * Attache les événements au formulaire
 */
ProfileUpdate.attachEvents = function(profiles) {
    // Récupérer les éléments du formulaire
    let selectEl = document.querySelector('.profileSelect');
    let form = document.querySelector('.updateProfile__form');
    
    // Ajouter un événement au select
    selectEl.addEventListener('change', function() {
        let selectedId = this.value;
        
        // Récupérer les champs du formulaire
        let inputId = form.querySelector('input[name="id"]');
        let inputName = form.querySelector('input[name="name"]');
        let inputAvatar = form.querySelector('input[name="avatar"]');
        let selectAge = form.querySelector('select[name="minAge"]');
        
        // Si aucun profil n'est sélectionné
        if (selectedId === '') {
            inputId.value = '';
            inputName.value = '';
            inputAvatar.value = '';
            selectAge.value = '';
        } 
        // Si un profil est sélectionné
        else {
            let option = this.options[this.selectedIndex];
            
            // Récupérer les données du profil
            let profileId = option.value;
            let profileName = option.getAttribute('data-name');
            let profileAvatar = option.getAttribute('data-avatar');
            let profileMinAge = option.getAttribute('data-minAge');
            
            // Remplir les champs
            inputId.value = profileId;
            inputName.value = profileName;
            inputAvatar.value = profileAvatar || '';
            selectAge.value = profileMinAge;
        }
    });
}

export {ProfileUpdate};
