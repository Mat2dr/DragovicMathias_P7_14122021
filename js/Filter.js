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

    /*--------- UPDATER ---------*/

    updateFilter(newIngredientsActiveTags, newUstensilesActiveTags, newAppareilActiveTags) {
        this.ingredientsActiveTags = newIngredientsActiveTags;
        this.ustensilesActiveTags = newUstensilesActiveTags;
        this.appareilActiveTags = newAppareilActiveTags;
    }

    /*--------- SEARCH ALGO ---------*/

    filter() {
        //reset
        recetteFiltered = [];

        //check each recette
        for (let i = 0; i < API.recettes.length; i++) {
            if (!!value) {
                //Si il y a une valeur dans la recherche principal
                 if (API.recettes[i].name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(value) || API.recettes[i].description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(value) || this.searchWithIngredients(API.recettes[i], value)) {
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

    /*--------- SEARCHBAR ---------*/

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

    /*--------- UTILS ---------*/
    
    //Fonction pour filtrer si la recette includes Ingredients active
    ingredientsFilter(recette) {
        let ingredientArray = [];
        for (var i = 0; i < recette.ingredients.length; i++) {
            ingredientArray.push(recette.ingredients[i].ingredient.toLowerCase())
        }

        const containsAll = this.ingredientsActiveTags.every(element => {
            return ingredientArray.includes(element);
          });

          return containsAll;
    }
    //Fonction pour filtrer si la recette includes Ustensiles active
    ustensilesFilter(recette) {
        let ustensilesArray = [];
        for (var i = 0; i < recette.ustensils.length; i++) {
            ustensilesArray.push(recette.ustensils[i].toLowerCase())
        }

        const containsAll = this.ustensilesActiveTags.every(element => {
            return ustensilesArray.includes(element);
          });

          return containsAll; 
    }
    //Fonction pour filtrer si la recette includes Appareils active
    appareilFilter(recette) {
            let appareilArray = [];
            //Loop dans les ingredients de toutes le recettes 
            appareilArray.push(recette.appliance.toLowerCase())

            const containsAll = this.appareilActiveTags.every(element => {
                 return appareilArray.includes(element);
            });

            return containsAll; 
    }

    searchWithIngredients(recette, searchValue) {
        let result;
        let ingredientsAll = [];
        let value = searchValue.toLowerCase();

        for (var i = 0; i < recette.ingredients.length; i++) {
            ingredientsAll.push(recette.ingredients[i].ingredient.toLowerCase())
        }

        for (var i = 0; i < ingredientsAll.length; i++) {
            if (ingredientsAll[i].normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(value)) {
                result = true;
                break
            } else {
                result = false;
            }
        }
        return result;
    }

    //Fonction pour recuperer la liste des ingredients dans recette Filtered
    getIngredients = () => {
        ingredientsRecetteFilter = [];

        recetteFiltered.forEach(recette => {
            recette.ingredients.forEach(leIngredient => {
                ingredientsRecetteFilter.push(leIngredient.ingredient.toLowerCase())
            });
            //Remove duplicate 
            ingredientsRecetteFilter = [...new Set(ingredientsRecetteFilter)];
        })
    }
    //Fonction pour recuperer la liste des ustensiles dans recette Filtered
    getUstensiles = () => {
        ustensilesRecetteFilter = [];

        recetteFiltered.forEach(recette => {
            recette.ustensils.forEach(lUstensile => {
                ustensilesRecetteFilter.push(lUstensile.toLowerCase())
            });
            //Remove duplicate 
            ustensilesRecetteFilter = [...new Set(ustensilesRecetteFilter)];
        })
    }
    //Fonction pour recuperer la liste des appareils dans recette Filtered
    getAppareils = () => {
        appareilRecetteFilter = [];

        recetteFiltered.forEach(recette => {
            appareilRecetteFilter.push(recette.appliance.toLowerCase())
            //Remove duplicate 
            appareilRecetteFilter = [...new Set(appareilRecetteFilter)];
        })
    }
}