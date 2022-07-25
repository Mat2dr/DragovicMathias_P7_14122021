import API from "./API.js";
import Tag from "./Tag.js";

const rechercheDiv = document.querySelector('.recherche-inputs');


export default class SearchbarFilter {

    name;
    tags;
    filter;

    constructor(name, tags, filter) {
        this.name = name;
        this.tags = tags;
        this.filter = filter;
    }

    SearchbarDisplay() {
        //Define for the close and open tag modal
        const divRecherche = ".recherche-"+this.name;
        //Create Input
        const searchDiv = document.createElement( 'div' );
        searchDiv.classList.add("recherche-"+this.name);
        const input = document.createElement( 'input' );
        input.classList.add("search-"+this.name);
        input.setAttribute("placeholder", this.name);

        const iconDown = document.createElement( 'i' );
        iconDown.classList.add('fas', 'fa-chevron-down');

        const inputDiv = document.createElement( 'div' );
        inputDiv.classList.add('input-div');

        inputDiv.appendChild(input);
        inputDiv.appendChild(iconDown);

        searchDiv.appendChild(inputDiv);

        rechercheDiv.appendChild(searchDiv);
        //Create list
        const tagDiv = document.createElement( 'div' );
        tagDiv.classList.add(this.name+"-keywords");
        tagDiv.classList.add("hidden");
        const tagList = document.createElement( 'ul' );
        tagList.classList.add(this.name+"-list");

        tagDiv.appendChild(tagList);
        searchDiv.appendChild(tagDiv);

        rechercheDiv.appendChild(searchDiv);

        //Generer la liste de tags
        this.tags.forEach(tag => {
            const tagEl = new Tag(tag, tagList, this.name, this.filter);
            tagEl.tagDisplay();
        });

        //Systeme pour ouvrir la liste de tags
        input.addEventListener('click', () => {
            tagDiv.classList.remove('hidden')
        })
        document.addEventListener("click", function(event) {
              // If user clicks outside the modal window
              if ( !event.target.closest(divRecherche) ) {
                tagDiv.classList.add('hidden')
              }
            });

        //Systeme de recherche
        input.addEventListener('input', e => {
            const value = e.target.value.toLowerCase();

            const tagEls = tagList.querySelectorAll("li")
            
            tagEls.forEach(tag => {
                if (!tag.innerHTML.includes(value)) {
                    tag.classList.add('hidden')
                } else {
                    tag.classList.remove('hidden')
                }
            });

        })
    }

    updateTagsList() {
        
    }


    
}