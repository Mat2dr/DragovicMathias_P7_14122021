export default class API {

    static recettes = [];
    static ingredients = [];
    static ustensiles = [];
    static appareils = [];

    // Fait une connection a la base de donnée 
    static fetchData = async () => {
        await fetch('./API/recipes.json')
        .then( function  (resp) {
            return resp.json();
            throw "Il n'y a pas de recettes pour aujourd'hui !"
        })
        .then( function (data) {
            API.recettes = data.recipes;
        })
    }

    static getRecettes = () => {
        return API.recettes;
    }

    static getIngredients = () => {
        let ingredientsArrayBase = [];


        API.recettes.forEach(recette => {
            //Recuperer les ingredients des recettes 
            recette.ingredients.forEach(leIngredient => {
                ingredientsArrayBase.push(leIngredient.ingredient)
            });
            //Remove duplicate 
            API.ingredients = [...new Set(ingredientsArrayBase)];
        })
        return API.ingredients;
    }

    static getUstensiles = () => {
        let ustensilesArrayBase = [];


        API.recettes.forEach(recette => {
            //Recuperer les ustensiles des recettes 
            recette.ustensils.forEach(lUstensile => {
                ustensilesArrayBase.push(lUstensile)
            });
            //Remove duplicate 
            API.ustensiles = [...new Set(ustensilesArrayBase)];
        })
        return API.ustensiles;
    }

    static getAppareils = () => {
        let appareilsArrayBase = [];


        API.recettes.forEach(recette => {
            //Recuperer les appareils des recettes 
            appareilsArrayBase.push(recette.appliance)
            //Remove duplicate 
            API.appareils = [...new Set(appareilsArrayBase)];
        })
        return API.appareils;
    }
}
