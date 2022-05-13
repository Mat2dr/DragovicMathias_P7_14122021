import API from "./API.js";
import Recette from "./Recette.js";

try {
    await API.fetchData();

        //Recuperer les recettes et affiche
        API.getRecettes().forEach(recette => {
            const recetteObj = new Recette(recette.id, recette.name, recette.servings, recette.ingredients, recette.time, recette.description, recette.appliance, recette.ustensils);
            recetteObj.recipeDisplay();
        });

        //Recperer les ingredients
        API.getIngredients();
        //Recperer les ustentiles
        API.getUstensiles();
        //Recperer les Appareils
        API.getAppareils();

} catch (error) {
    console.log(error)
}