import API from "./API.js";
import Recette from "./Recette.js";
import SearchbarFilter from "./SearchbarFilter.js";
import Filter from "./Filter.js";

const searchBar = document.querySelector('[data-search-main]');

let ingredientsActiveTags = [];
let ustensilesActiveTags = [];
let appareilActiveTags = [];

try {
    await API.fetchData();
        /*--------- AFFICHER LES RECETTES ---------*/

        //Recuperer les recettes et affiche
        API.getRecettes().forEach(recette => {
            const recetteObj = new Recette(recette.id, recette.name, recette.servings, recette.ingredients, recette.time, recette.description, recette.appliance, recette.ustensils);
            recetteObj.recipeDisplay();
        });

        /*--------- AFFICHER LES TAGS SEARCHBARS ---------*/

        //Recperer la liste des ingredients
        const ingredients = API.getIngredients(); 
        //Recperer la liste des ustentiles
        const ustensils = API.getUstensiles();
        //Recperer la liste des Appareils
        const appliance = API.getAppareils();

        //Lunch un filtre
        const filter = new Filter(ingredientsActiveTags, ustensilesActiveTags, appareilActiveTags, searchBar);
        
        //Create SearchBar ingredients
        const SearchbarFilterIngredients = new SearchbarFilter('ingredients', ingredients, filter);
        SearchbarFilterIngredients.SearchbarDisplay();
        //Create SearchBar appareils
        const SearchbarFilterAppareils = new SearchbarFilter('appareils', appliance, filter);
        SearchbarFilterAppareils.SearchbarDisplay(); 
        //Create SearchBar ustensiles
        const SearchbarFilterUstensiles = new SearchbarFilter('ustensiles', ustensils, filter);
        SearchbarFilterUstensiles.SearchbarDisplay();
} catch (error) {
    console.log(error)
}