let templateFile = await fetch('./component/MovieForm/template.html');
let template = await templateFile.text();

let MovieForm = {};

MovieForm.format = function(handler, categories){
    let html = template;
    
    // Générer les options de catégories dynamiquement
    let categoriesOptions = '<option value="">-- Catégorie --</option>';
    for (const category of categories) {
        categoriesOptions += '<option value="' + category.id + '">' + category.name + '</option>';
    }
    
    html = html.replace('{{categories}}', categoriesOptions);
    html = html.replace('{{handler}}', handler);
    return html;
}

export {MovieForm};
