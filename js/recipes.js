/*--------- DOM ELEMENTS ---------*/
let theRecipes;

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

const recipesDisplay = async () => {
    await fetchRecipes();

    console.log(theRecipes);

    const recipesSection = document.querySelector("#resultats");

    theRecipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipesSection.appendChild(recipeCardDOM);
    });

}

recipesDisplay();