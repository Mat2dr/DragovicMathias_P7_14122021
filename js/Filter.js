import Tag from "./Tag.js";
import API from "./API.js";
import SearchbarFilter from "./SearchbarFilter.js";
import Recette from "./Recette.js";

let recetteFiltered = [];

let value = "";

let ingredientsRecetteFilter = [];
let ustensilesRecetteFilter = [];
let appareilRecetteFilter = [];

const resultatsDiv = document.querySelector('#resultats');
const rechercheDiv = document.querySelector('.recherche-inputs');

export default class Filter {

    ingredientsActiveTags = [];
    ustensilesActiveTags = [];
    appareilActiveTags = [];
    searchBar;

    constructor(ingredientsActiveTags, ustensilesActiveTags, appareilActiveTags, searchBar) {
        this.ingredientsActiveTags = ingredientsActiveTags;
        this.ustensilesActiveTags = ustensilesActiveTags;
        this.appareilActiveTags = appareilActiveTags;
        this.searchBar = searchBar;

        this.searchMain();
    }

    updateFilter(newIngredientsActiveTags, newUstensilesActiveTags, newAppareilActiveTags) {
        this.ingredientsActiveTags = newIngredientsActiveTags;
        this.ustensilesActiveTags = newUstensilesActiveTags;
        this.appareilActiveTags = newAppareilActiveTags;
    }
    updateTags(ingredientTags) {
        this.ingredientTags = ingredientTags;
    }

    filter() {
        //reset
        recetteFiltered = [];

        //check each recette
        for (let i = 0; i < API.recettes.length; i++) {
            if (!!value) {
                //Si il y a une valeur dans la recherche principal
                 if (API.recettes[i].name.toLowerCase().includes(value) || API.recettes[i].description.toLowerCase().includes(value)) {
                    //Si il y a des tags active
                    if (this.ingredientsActiveTags || this.ustensilesActiveTags || this.appareilActiveTags) {
                        if (this.ingredientsFilter(API.recettes[i]) && this.ustensilesFilter(API.recettes[i]) && this.appareilFilter(API.recettes[i])) {
                            recetteFiltered.push(API.recettes[i]);
                        }
                    } else {
                        recetteFiltered.push(API.recettes[i]);
                    }
                } 
            } else {
                //Si il n'y a pas de valeur dans la recherche principal
                if (this.ingredientsFilter(API.recettes[i]) && this.ustensilesFilter(API.recettes[i]) && this.appareilFilter(API.recettes[i])) {
                    recetteFiltered.push(API.recettes[i]);
                }
            }
            recetteFiltered = [...new Set(recetteFiltered)];
        }
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

            const SearchbarFilteredIngredients = new SearchbarFilter('ingredients', ingredientsRecetteFilter, this);
            SearchbarFilteredIngredients.SearchbarDisplay();

            const SearchbarFilteredAppareils = new SearchbarFilter('appareils', appareilRecetteFilter, this);
            SearchbarFilteredAppareils.SearchbarDisplay(); 

            const SearchbarFilteredUstensiles = new SearchbarFilter('ustensiles', ustensilesRecetteFilter, this);
            SearchbarFilteredUstensiles.SearchbarDisplay();
        } else {
            resultatsDiv.innerHTML = "";
            resultatsDiv.innerHTML='<p>Aucune recette ne correspond à votre critère… vous pouvez chercher "tarte aux pommes", "poisson", etc</p>';
        } 
    }

    searchMain() {
        this.searchBar.addEventListener('input', e => {
            value = e.target.value.toLowerCase();

            //Commence la main recherche
            if (value.length > 2) {
                this.filter();
            } else if (value.length < 3) {
                value = " ";
                this.filter();
            }
        })
    }


    // Utils
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
        //Loop dans les ustensiles de toutes le recettes 
        for (var i = 0; i < recette.ustensils.length; i++) {
            ustensilesArray.push(recette.ustensils[i].toLowerCase())
        }

        const containsAll = this.ustensilesActiveTags.every(element => {
            return ustensilesArray.includes(element);
          });

          return containsAll; 
    }
    appareilFilter(recette) {
            let appareilArray = [];
            //Loop dans les ingredients de toutes le recettes 
            appareilArray.push(recette.appliance.toLowerCase())

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