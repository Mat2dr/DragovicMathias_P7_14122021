import API from "./API.js";
import Tag from "./Tag.js";

const rechercheDiv = document.querySelector('.recherche-inputs');


export default class SearchbarFilter {

    name;
    tags;

    constructor(name, tags) {
        this.name = name;
        this.tags = tags;
    }

    SearchbarDisplay() {
        //Create Input
        const searchDiv = document.createElement( 'div' );
        searchDiv.classList.add("recherche-"+this.name);
        const input = document.createElement( 'input' );
        input.classList.add("search-"+this.name);
        input.setAttribute("placeholder", this.name);

        const iconDown = document.createElement( 'i' );
        iconDown.classList.add('fas', 'fa-chevron-down')

        searchDiv.appendChild(input);
        searchDiv.appendChild(iconDown);
        rechercheDiv.appendChild(searchDiv);
        //Create list
        const tagDiv = document.createElement( 'div' );
        tagDiv.classList.add(this.name+"-keywords");
        tagDiv.classList.add("hidden");
        const tagList = document.createElement( 'ul' );
        tagList.classList.add(this.name+"-list");

        tagDiv.appendChild(tagList)
        rechercheDiv.appendChild(tagDiv)

        
        this.tags.forEach(tag => {
            const tagEl = new Tag(tag, tagList);
            tagEl.tagDisplay();
        });

        input.addEventListener('click', () => {
            tagDiv.classList.toggle('hidden')
        })
    }


    
}