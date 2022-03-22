/*--------- DOM ELEMENTS ---------*/
let theRecipes;

let ingredientsArray = [];

const rechercheIngredients = document.querySelector('.recherche-ingredients');
const filterIngredientsDiv = document.querySelector(".filter-show-div");
const ingredientDiv = document.querySelector(".ingredients-keywords");


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

    /*RECUPERER LES INGREDIENTS */
    theRecipes.forEach((recipe) => {
        //Recuperer les ingredients des recettes
        recipe.ingredients.forEach((lesIngredients) => {
            // Turn the data in LowerCase
            let ingredientLowerCase = lesIngredients.ingredient.toLowerCase();
            // push ingredient only if it's not inside of ingredientsArray
            if (ingredientsArray.includes(ingredientLowerCase) === false) {
                ingredientsArray.push(ingredientLowerCase);
            }
        });
        // Sorts the ingredients in alphabetical order.
        ingredientsArray.sort();
    });
    /*AFFICHER LES INGREDIENTS */
    const ingredientDiv = document.querySelector(".ingredients-keywords");
    const ingredientUl = document.createElement( 'ul' );
    ingredientDiv.appendChild(ingredientUl);

    ingredientsArray.forEach((ingredient) => {
        const ingredientLi = document.createElement( 'li' );
        ingredientLi.innerHTML = ingredient;
        ingredientUl.appendChild(ingredientLi);

        ingredientLi.addEventListener("click", () => {
            ingredientLi.classList.add("active-ingredient");
        })
    });

    const filterIngredients = document.querySelectorAll(".active-ingredient");

    for (let i = 0; i < filterIngredients.length; i++) {
        const ingredientTag = document.createElement( 'li' );
        ingredientTag.innerHTML = filterIngredient[i].innerHTML;
        filterIngredientsDiv.appendChild(ingredientTag);
    }
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