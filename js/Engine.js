import API from "./API.js";
import Recette from "./Recette.js";
import Tag from "./Tag.js";
import SearchbarFilter from "./SearchbarFilter.js";
import Filter from "./Filter.js";

const searchBar = document.querySelector('[data-search-main]');

let ingredientsActiveTags = [];
let ustensilesActiveTags = [];
let appareilActiveTags = [];

try {
    await API.fetchData();
        //Recuperer les recettes et affiche
        API.getRecettes().forEach(recette => {
            const recetteObj = new Recette(recette.id, recette.name, recette.servings, recette.ingredients, recette.time, recette.description, recette.appliance, recette.ustensils);
            recetteObj.recipeDisplay();
        });
        //Recperer les ingredients
        const ingredients = API.getIngredients(); 
        //Recperer les ustentiles
        const ustensils = API.getUstensiles();
        //Recperer les Appareils
        const appliance = API.getAppareils();

        const filter = new Filter(ingredientsActiveTags, ustensilesActiveTags, appareilActiveTags, searchBar);

        const SearchbarFilterIngredients = new SearchbarFilter('ingredients', ingredients, filter);
        SearchbarFilterIngredients.SearchbarDisplay();

        const SearchbarFilterUstensiles = new SearchbarFilter('ustensiles', ustensils, filter);
        SearchbarFilterUstensiles.SearchbarDisplay();

        const SearchbarFilterAppareils = new SearchbarFilter('appareil', appliance, filter);
        SearchbarFilterAppareils.SearchbarDisplay(); 
} catch (error) {
    console.log(error)
}