import API from "./API.js";
import SearchbarFilter from "./SearchBarFilter.js";
import Searchbar from "./SearchBarFilter.js";

let activeTags = [];
const activeTagDiv = document.querySelector('.tags-active');

export default class Tag {
    
    name;
    searchType;

    constructor(name, searchType) {
        this.name = name;
        this.searchType = searchType;
    }

    tagDisplay() {
        const tag = document.createElement('li')
        tag.innerText = this.name;

        this.searchType.appendChild(tag);

        tag.addEventListener('click', () => {
            if(!activeTags.includes(this.name)) {
                activeTags.push(this.name);
                this.activeTagDisplay();
            }
        })
    }

    activeTagDisplay() {
        activeTagDiv.innerHTML="";
        activeTags.forEach(activeTag => {
            const activedtag = document.createElement('li')
            activedtag.innerText = activeTag;

            activeTagDiv.appendChild(activedtag);

            activedtag.addEventListener('click', () => {
                activeTags = activeTags.filter(e => e !== activeTag);
                console.log(activeTags);
                activedtag.remove();
            })
        });
    }
     
}