import API from "./API.js";
import Recette from "./Recette.js";
import Tag from "./Tag.js";
import Searchbar from "./Searchbar.js";
import SearchbarFilter from "./SearchbarFilter.js";

const searchInput = document.querySelector('[data-search-main]');
const ingredientsList = document.querySelector('.ingredients-list');
let activeTag = [];
let activeRecettes = [];

try {
    await API.fetchData();
        //Recuperer les recettes et affiche
        API.getRecettes().forEach(recette => {
            const recetteObj = new Recette(recette.id, recette.name, recette.servings, recette.ingredients, recette.time, recette.description, recette.appliance, recette.ustensils);
            recetteObj.recipeDisplay();
        });

        //create the searchBars
        const ingredients = API.getIngredients(); 
        //Recperer les ustentiles
        const ustensils = API.getUstensiles();
        //Recperer les Appareils
        const appliance = API.getAppareils();
        

        const SearchbarFilterIngredients = new SearchbarFilter('ingredients', ingredients);
        SearchbarFilterIngredients.SearchbarDisplay();

        const SearchbarFilterUstensiles = new SearchbarFilter('ustensiles', ustensils);
        SearchbarFilterUstensiles.SearchbarDisplay();

        const SearchbarFilterAppareils = new SearchbarFilter('appareil', appliance);
        SearchbarFilterAppareils.SearchbarDisplay();

        Searchbar.recherche(searchInput);

} catch (error) {
    console.log(error)
}