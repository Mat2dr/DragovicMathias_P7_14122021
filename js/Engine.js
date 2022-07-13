import API from "./API.js";
import Recette from "./Recette.js";
import Tag from "./Tag.js";
import SearchbarFilter from "./SearchbarFilter.js";
import Filter from "./Filter.js";

const searchInput = document.querySelector('[data-search-main]');

try {
    await API.fetchData();
        //Recuperer les recettes et affiche
        API.getRecettes().forEach(recette => {
            const recetteObj = new Recette(recette.id, recette.name, recette.servings, recette.ingredients, recette.time, recette.description, recette.appliance, recette.ustensils);
            recetteObj.recipeDisplay();
        });

        const filterLunch = new Filter();
        filterLunch.lunch();
        filterLunch.searchMain(searchInput);

        //Searchbar.recherche(searchInput);

} catch (error) {
    console.log(error)
}