import API from "./API.js";
import Recette from "./Recette.js";

const resultatsDiv = document.querySelector('#resultats');
let activeRecettes = [];

export default class Searchbar {

    static recherche(searchBar) {
        searchBar.addEventListener('input', e => {
            const value = e.target.value.toLowerCase();

            //Commence la main recherche
            if (value.length > 2) {
                resultatsDiv.innerHTML="";
                API.recettes.forEach(recette => {
                    if (recette.name.toLowerCase().includes(value) || recette.description.toLowerCase().includes(value)) {
                        activeRecettes.push(recette);
                        const recetteObj = new Recette(recette.id, recette.name, recette.servings, recette.ingredients, recette.time, recette.description, recette.appliance, recette.ustensils);
                        recetteObj.recipeDisplay();
                    }
                });
                //If no recette
                if (activeRecettes.length === 0) {
                    activeRecettes = "";
                    resultatsDiv.innerHTML='<p>Aucune recette ne correspond à votre critère… vous pouvez chercher "tarte aux pommes", "poisson", etc</p>';
                }
            } else {
                resultatsDiv.innerHTML="";
                API.recettes.forEach(recette => {
                    activeRecettes.push(recette);
                    const recetteObj = new Recette(recette.id, recette.name, recette.servings, recette.ingredients, recette.time, recette.description, recette.appliance, recette.ustensils);
                    recetteObj.recipeDisplay();
                });
            }
        })
    }
    
}
