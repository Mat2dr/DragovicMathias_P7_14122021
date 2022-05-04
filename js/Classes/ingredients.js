/*-----------------------------*/
/*------- DOM ELEMENTS --------*/
const ingredientDiv = document.querySelector(".ingredients-keywords");
const ingredientsList = document.createElement('ul')

ingredientDiv.appendChild(ingredientsList);

const filterDiv = document.querySelector(".filter-show-div");

/*-----------------------------*/
/*----- CLASS INGREDIENT ------*/
/*-----------------------------*/
class Ingredient {

    name;
  
    constructor(name) {
      const ingredientName = name.toLowerCase();
      this.name = ingredientName;
    }

    ingredientDisplay() {
        const ingredientTag = document.createElement( 'li' );
        ingredientTag.innerHTML = this.name;

        ingredientTag.addEventListener('click', () => {
          ingredientTag.classList.toggle('ingredient--selected');

          if (ingredientTag.classList.contains('ingredient--selected')) {
            selectedIngredients.push(this.name);
          } else if (!ingredientTag.classList.contains('ingredient--selected')) {
            selectedIngredients.pop(this.name);
          }

          filterDiv.innerHTML='';
          ingredientSelected();
        })

        ingredientsList.appendChild(ingredientTag);
    }
  
  }

  class IngredientSelected {

    name;
  
    constructor(name) {
      this.name = name;
    }

    ingredientSelectedDisplay() {
      const ingredientSelected = document.createElement('p')
      ingredientSelected.innerHTML = this.name;

      filterDiv.appendChild(ingredientSelected)
    }
  }


  function ingredientSelected() {
    selectedIngredients.forEach(selectedIngredient => {
      const ingredientSelectedObj = new IngredientSelected(selectedIngredient);
      ingredientSelectedObj.ingredientSelectedDisplay();
    })
  }