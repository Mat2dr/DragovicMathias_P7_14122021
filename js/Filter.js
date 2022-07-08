import Tag from "./Tag.js";
import API from "./API.js";
import SearchbarFilter from "./SearchbarFilter.js";
import Recette from "./Recette.js";

let recetteFiltered = [];

let ingredientsRecetteFilter = [];
let ustensilesRecetteFilter = [];
let appareilRecetteFilter = [];

const resultatsDiv = document.querySelector('#resultats');
const rechercheDiv = document.querySelector('.recherche-inputs');

export default class Filter {

    ingredientsActiveTags = [];
    ustensilesActiveTags = [];
    appareilActiveTags = [];

    constructor(ingredientsActiveTags, ustensilesActiveTags, appareilActiveTags) {
        this.ingredientsActiveTags = ingredientsActiveTags;
        this.ustensilesActiveTags = ustensilesActiveTags;
        this.appareilActiveTags = appareilActiveTags;
    }

    lunch() {
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
    }

    filter() {
        recetteFiltered = [];

        API.recettes.forEach(recette => {
            this.check(recette);
        });

        if (recetteFiltered.length) {
            resultatsDiv.innerHTML = "";
            recetteFiltered.forEach(recette => {
                const recetteObj = new Recette(recette.id, recette.name, recette.servings, recette.ingredients, recette.time, recette.description, recette.appliance, recette.ustensils);
                recetteObj.recipeDisplay();
            });

             rechercheDiv.innerHTML='';

            this.getIngredients();
            this.getUstensiles();
            this.getAppareils();

            const SearchbarFilteredIngredients = new SearchbarFilter('ingredients', ingredientsRecetteFilter);
            SearchbarFilteredIngredients.SearchbarDisplay();

            const SearchbarFilteredUstensiles = new SearchbarFilter('ustensiles', ustensilesRecetteFilter);
            SearchbarFilteredUstensiles.SearchbarDisplay();

            const SearchbarFilteredAppareils = new SearchbarFilter('appareil', appareilRecetteFilter);
            SearchbarFilteredAppareils.SearchbarDisplay();

        } else {
            resultatsDiv.innerHTML = "";
            API.recettes.forEach(recette => {
                const recetteObj = new Recette(recette.id, recette.name, recette.servings, recette.ingredients, recette.time, recette.description, recette.appliance, recette.ustensils);
                recetteObj.recipeDisplay();
            });
            rechercheDiv.innerHTML='';
            this.lunch();
        }
    }

    check(recette) {
/*         if (this.ingredientsFilter(recette) || !this.ingredientsActiveTags.length && this.ustensilesFilter(recette) || !this.ustensilesActiveTags.length && this.appareilFilter(recette) || !this.appareilActiveTags.length) {
            console.log('test push');
        } */
        if (this.ingredientsFilter(recette) && this.ustensilesFilter(recette) && this.appareilFilter(recette)) {
            recetteFiltered.push(recette);
            console.log(recette);
        }

        recetteFiltered = [...new Set(recetteFiltered)];
    }

    ingredientsFilter(recette) {
        let ingredientArray = [];
        //Loop dans les ingredients de toutes le recettes 
        for (var i = 0; i < recette.ingredients.length; i++) {
            ingredientArray.push(recette.ingredients[i].ingredient.toLowerCase())
        }

        const containsAll = this.ingredientsActiveTags.every(element => {
            return ingredientArray.includes(element);
          });

          return containsAll;
    }
    ustensilesFilter(recette) {
        let ustensilesArray = [];
        //Loop dans les ingredients de toutes le recettes 
        for (var i = 0; i < recette.ustensils.length; i++) {
            ustensilesArray.push(recette.ustensils[i].toLowerCase())
        }
        console.log(ustensilesArray);

        const containsAll = this.ustensilesActiveTags.every(element => {
            return ustensilesArray.includes(element);
          });

          return containsAll; 
    }
    appareilFilter(recette) {
             if (this.appareilActiveTags.includes(recette.appliance.toLowerCase())) {
                //recetteFiltered.push(recette);
               // console.log(recetteFiltered)
                return true;
            }
            let appareilArray = [];
        //Loop dans les ingredients de toutes le recettes 
        for (var i = 0; i < recette.appliance.length; i++) {
            appareilArray.push(recette.appliance[i].toLowerCase())
        }
        console.log(appareilArray);

        const containsAll = this.appareilActiveTags.every(element => {
            return appareilArray.includes(element);
          });

          return containsAll; 
    }

    getIngredients = () => {
        ingredientsRecetteFilter = [];

        recetteFiltered.forEach(recette => {
            //Recuperer les ingredients des recettes 
            recette.ingredients.forEach(leIngredient => {
                ingredientsRecetteFilter.push(leIngredient.ingredient.toLowerCase())
            });
            //Remove duplicate 
            ingredientsRecetteFilter = [...new Set(ingredientsRecetteFilter)];
        })
    }

    getUstensiles = () => {
        ustensilesRecetteFilter = [];


        recetteFiltered.forEach(recette => {
            //Recuperer les ustensiles des recettes 
            recette.ustensils.forEach(lUstensile => {
                ustensilesRecetteFilter.push(lUstensile.toLowerCase())
            });
            //Remove duplicate 
            ustensilesRecetteFilter = [...new Set(ustensilesRecetteFilter)];
        })
    }

    getAppareils = () => {
        appareilRecetteFilter = [];


        recetteFiltered.forEach(recette => {
            //Recuperer les appareils des recettes 
            appareilRecetteFilter.push(recette.appliance.toLowerCase())
            //Remove duplicate 
            appareilRecetteFilter = [...new Set(appareilRecetteFilter)];
        })
    }
}