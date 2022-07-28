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

        const iconUp = document.createElement( 'i' );
        iconUp.classList.add('fas', 'fa-chevron-up', 'hidden');


        const inputDiv = document.createElement( 'div' );
        inputDiv.classList.add('input-div');

        inputDiv.appendChild(input);
        inputDiv.appendChild(iconDown);
        inputDiv.appendChild(iconUp);

        searchDiv.appendChild(inputDiv);

        rechercheDiv.appendChild(searchDiv);
        //Create list
        const tagDiv = document.createElement( 'div' );
        tagDiv.classList.add(this.name+"-keywords");
        tagDiv.classList.add("hidden");
        const messageEmpty = document.createElement( 'div' );
        messageEmpty.innerHTML = "Mince, impossible de trouver dans notre liste d'"+this.name;
        messageEmpty.classList.add('hidden');
        const tagList = document.createElement( 'ul' );
        tagList.classList.add(this.name+"-list");

        tagDiv.appendChild(tagList);
        tagDiv.appendChild(messageEmpty);
        searchDiv.appendChild(tagDiv);

        rechercheDiv.appendChild(searchDiv);

        //Generer la liste de tags
        this.tags.forEach(tag => {
            const tagEl = new Tag(tag, tagList, this.name, this.filter);
            tagEl.tagDisplay();
        });

        //Systeme pour ouvrir la liste de tags
        input.addEventListener('click', () => {
            if(tagDiv.classList.contains('hidden')) {
                tagDiv.classList.remove('hidden');
                iconUp.classList.remove('hidden');
                iconDown.classList.add('hidden');
                searchDiv.style.width = "645px"; 
                input.setAttribute("placeholder", 'Rechercher des '+this.name);
            } else if(!tagDiv.classList.contains('hidden')) {
                tagDiv.classList.add('hidden');
                iconUp.classList.add('hidden');
                iconDown.classList.remove('hidden');
                searchDiv.style.removeProperty("width");
                input.setAttribute("placeholder", this.name);
            }
        })
        //Systeme de recherche
        input.addEventListener('input', e => {
            const value = e.target.value.toLowerCase();
            const newTagsList = [];

            //filter if match recherche
            this.tags.forEach(tag => {
                if (tag.includes(value)) {
                    newTagsList.push(tag);
                } 
            });
            //newTagsList = [...new Set(newTagsList)];

            //affiche la nouvelle list
            if (newTagsList.length) {
                messageEmpty.classList.add('hidden');
                tagList.innerHTML="";
                newTagsList.forEach(tag => {
                    const tagEl = new Tag(tag, tagList, this.name, this.filter);
                    tagEl.tagDisplay();
                });
            } else if (newTagsList.length === 0) {
                tagList.innerHTML="";
                messageEmpty.classList.remove('hidden');
            }

        })
    }
}