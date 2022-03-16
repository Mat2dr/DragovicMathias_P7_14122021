/*--------- DOM ELEMENTS ---------*/
let theRecipes;

let ingredientsArray = [];
let appliancesArray = [];
let ustensilsArray = [];

const rechercheIngredients = document.querySelector('.recherche-ingredients');


/*--------- EVENTS ---------*/

/*--------- FUNCTIONS ---------*/

const fetchRecipes = async () => {
    await fetch('./API/recipes.json')
    .then( function  (resp) {
        return resp.json();
    })
    .then( function (data) {
        theRecipes = data.recipes;
    });
};

const keywordDisplay = async () => {
    await fetchRecipes();

    theRecipes.forEach((recipe) => {
        /* LES INGREDIENTS */
        //Recuperer les ingredients des recettes
        recipe.ingredients.forEach((lesIngredients) => {
            ingredientsArray.push(lesIngredients.ingredient);
        });
        /* LES APPAREILS */
        //Recuperer les appareils des recettes
        appliancesArray.push(recipe.appliance);

        /* LES USTENSILES */
        //Recuperer les ustensiles des recettes
        recipe.ustensils.forEach((lesUstensiles) => {
            ustensilsArray.push(lesUstensiles);
        });
    });
    // Remove duplicates from ingredientsArray into uniqueIngredientsArray
    let uniqueIngredientsArray = [...new Set(ingredientsArray)];
    // Remove duplicates from appliancesArray into uniqueAppliancesArray
    let uniqueAppliancesArray = [...new Set(appliancesArray)];
    // Remove duplicates from ustensilsArray into uniqueUstensilsArray
    let uniqueUstensilsArray = [...new Set(ustensilsArray)];
    /* REMOVE */
    console.log(uniqueIngredientsArray);
    console.log(uniqueAppliancesArray);
    console.log(uniqueUstensilsArray);

    uniqueIngredientsArray.forEach((unIngredient) => {
        // Faire un factory
    })
}

const recipesDisplay = async () => {
    await fetchRecipes();

    const recipesSection = document.querySelector("#resultats");

    theRecipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipesSection.appendChild(recipeCardDOM);
    });
}


keywordDisplay();
recipesDisplay();