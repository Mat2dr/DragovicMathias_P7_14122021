
/*-----------------------------*/
/*------- DOM ELEMENTS --------*/
let theRecipes;
let ingredientsArrayBase = [];
let ingredientsArray = [];

let selectedIngredients = [];

const ingredientsSearchBar = document.querySelector('.searchBarIngredients');
const ingredientsDivClose = document.querySelector('.ingredients-keywords--close');

/*-----------------------------*/
/*--------- FUNCTIONS ---------*/

/*--------- RECUPERER LES DONNEES ---------*/
const fetchRecipes = async () => {
    await fetch('./API/recipes.json')
    .then( function  (resp) {
        return resp.json();
    })
    .then( function (data) {
        theRecipes = data.recipes;
    });
};

/*-----------------------------*/
/*--------- AFFICHER ----------*/
/*-----------------------------*/

/*--------- AFFICHER LES RECETTES ---------*/
const recipes = async () => {
    await fetchRecipes();

    theRecipes.forEach((recipe) => {
        const recipeObj = new Recipe(recipe.id, recipe.name, recipe.servings, recipe.ingredients, recipe.time, recipe.description, recipe.appliance, recipe.ustensils);
        recipeObj.recipeDisplay();

        //Recuperer les ingredients des recettes 
        recipe.ingredients.forEach(leIngredient => {
            ingredientsArrayBase.push(leIngredient.ingredient)
        });

        ingredientsArray = [...new Set(ingredientsArrayBase)];
    });
}

/*--------- RECUPERER LES INGREDIENTS DES RECETTES ---------*/
 const ingredients = async () => {
    await recipes();
    
    ingredientsArray.forEach(ingredient => {
        const ingredientObj = new Ingredient(ingredient);
        ingredientObj.ingredientDisplay();
    });
}

/*-----------------------------*/
/*--------- SEARCHBAR ---------*/
/*-----------------------------*/

/*--------- SEARCH BAR INGREDIENTS ---------*/
function ingredientSearchBar() {
    ingredientDiv.style.display = 'none';

    ingredientsSearchBar.addEventListener('click', showIngredients);
    ingredientsDivClose.addEventListener('click', closeIngredients);

    function showIngredients() {
        ingredientDiv.style.display = 'block';
    }
    function closeIngredients() {
        ingredientDiv.style.display = 'none';
    }
}

/*-----------------------------*/
/*---------- SEARCH -----------*/
/*-----------------------------*/




recipes();
ingredients();
ingredientSearchBar();