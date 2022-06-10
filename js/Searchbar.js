import API from "./API.js";
import Recette from "./Recette.js";

const resultatsDiv = document.querySelector('#resultats');

export default class Searchbar {

    static recherche(searchBar) {
        searchBar.addEventListener('input', e => {
            const value = e.target.value.toLowerCase();

            //Commence la main recherche
            if (value.length > 2) {
                resultatsDiv.innerHTML="";
                API.recettes.forEach(recette => {
                    if (recette.name.toLowerCase().includes(value) || recette.description.toLowerCase().includes(value)) {
                        const recetteObj = new Recette(recette.id, recette.name, recette.servings, recette.ingredients, recette.time, recette.description, recette.appliance, recette.ustensils);
                        recetteObj.recipeDisplay();
                    }
                });
                const articleRecette = document.querySelectorAll('.article-recette')
                console.log(articleRecette);
                if (articleRecette.length === 0) {
                    resultatsDiv.innerHTML='<p>Aucune recette ne correspond à votre critère… vous pouvez chercher "tarte aux pommes", "poisson", etc</p>';
                }
            } else {
                resultatsDiv.innerHTML="";
                API.recettes.forEach(recette => {
                    const recetteObj = new Recette(recette.id, recette.name, recette.servings, recette.ingredients, recette.time, recette.description, recette.appliance, recette.ustensils);
                    recetteObj.recipeDisplay();
                });
            }
        })
    }
    
}
