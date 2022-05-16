import API from "./API.js";
import Recette from "./Recette.js";
import Tag from "./Tag.js";
import Searchbar from "./Searchbar.js";

const searchInput = document.querySelector('[data-search-main]');
const ingredientsList = document.querySelector('.ingredients-list');

try {
    await API.fetchData();
        //Recuperer les recettes et affiche
        API.getRecettes().forEach(recette => {
            const recetteObj = new Recette(recette.id, recette.name, recette.servings, recette.ingredients, recette.time, recette.description, recette.appliance, recette.ustensils);
            recetteObj.recipeDisplay();
        });
        //Recperer les ingredients
        API.getIngredients().forEach(ingredient => {
            const tagIngredient = new Tag(ingredient, ingredientsList);
            tagIngredient.tagDisplay();
        });
        //Recperer les ustentiles
        API.getUstensiles();
        //Recperer les Appareils
        API.getAppareils();

        Searchbar.recherche(searchInput);

} catch (error) {
    console.log(error)
}