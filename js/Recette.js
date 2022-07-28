export default class Recette {
    
    id;
    name;
    servings;
    ingredients;
    time;
    description;
    appliance;
    ustensils;
  
    constructor(id, name, servings, ingredients, time, description, appliance, ustensils) {
      this.id = id;
      this.name = name;
      this.servings = servings;
      this.ingredients = ingredients;
      this.time = time;
      this.description = description;
      this.appliance = appliance;
      this.ustensils = ustensils;
    }

    recipeDisplay() {
      const recipesSection = document.querySelector("#resultats");
        //Setup element
     const article = document.createElement( 'article' );
     article.classList.add("article-recette");

     const imgDiv = document.createElement( 'div' );
     imgDiv.classList.add("img");
     const imgEl = document.createElement( 'img' );
     const laPhoto = `images/recipes/${this.id}.jpg`;
     imgEl.setAttribute("src", laPhoto);
     imgDiv.appendChild(imgEl);

     const descriptionDiv = document.createElement( 'div' );
     descriptionDiv.classList.add("description");
     const header = document.createElement( 'header' );
     const title = document.createElement( 'div' );
     title.classList.add("title");
     const titleH2 = document.createElement( 'h2' );
     titleH2.innerHTML = this.name;

     const timeDiv = document.createElement( 'div' );
     timeDiv.classList.add("time");
     const timeI = document.createElement( 'i' );
     timeI.classList.add("far","fa-clock");
     timeDiv.appendChild(timeI);
     const timeP = document.createElement( 'p' );
     timeP.innerHTML = this.time +"min";
     timeDiv.appendChild(timeP);

     const recetteDiv = document.createElement( 'div' );
     recetteDiv.classList.add("recette");

     const listeUL = document.createElement( 'ul' );
     listeUL.classList.add("liste");

     const explicationDiv = document.createElement( 'div' );
     explicationDiv.classList.add("explication");

     this.ingredients.forEach(ingredientEl => {
      if (ingredientEl.hasOwnProperty('quantity')) {
        const listeLI = document.createElement( 'li' );
        const span = document.createElement( 'span' );
        span.innerHTML = ingredientEl.ingredient +': '; 
        const quant = document.createElement( 'p' );
        if (ingredientEl.hasOwnProperty('unit')) {
         quant.innerHTML = ingredientEl.quantity + ingredientEl.unit;
        } else {
         quant.innerHTML = ingredientEl.quantity;
        }
        

        listeLI.appendChild(span);
        listeLI.appendChild(quant);
        listeUL.appendChild(listeLI);
      } else {
       const listeLI = document.createElement( 'li' );
       const span = document.createElement( 'span' );
       span.innerHTML = ingredientEl.ingredient; 

       listeLI.appendChild(span);
       listeUL.appendChild(listeLI);
      }

     });
     recetteDiv.appendChild(listeUL);

     const recetteP = document.createElement( 'p' );
     recetteP.innerHTML = this.description;
     explicationDiv.appendChild(recetteP);
     recetteDiv.appendChild(explicationDiv);

     article.appendChild(imgDiv);
     article.appendChild(descriptionDiv);
     

     descriptionDiv.appendChild(header);
     descriptionDiv.appendChild(recetteDiv);

     header.appendChild(title);
     header.appendChild(timeDiv);
     title.appendChild(titleH2);

     recipesSection.appendChild(article);
    }
  
  }
