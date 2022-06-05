import API from "./API.js";
import SearchbarFilter from "./SearchBarFilter.js";
import Searchbar from "./SearchBarFilter.js";

let activeTags = [];
const activeTagDiv = document.querySelector('.tags-active');

export default class Tag {
    
    name;
    searchType;
    genre;

    constructor(name, searchType, genre) {
        this.name = name;
        this.searchType = searchType;
        this.genre = genre;
    }

    tagDisplay() {
        const tag = document.createElement('li')
        tag.innerText = this.name;

        this.searchType.appendChild(tag);

        tag.addEventListener('click', () => {
            tag.classList.add(this.genre+'--selected');
            if(!activeTags.includes(this.name)) {
                activeTags.push(this.name);
                this.activeTagDisplay(this.genre);
            } else {
                tag.classList.remove(this.genre+'--selected');
                activeTags = activeTags.filter(e => e !== this.name);
                this.activeTagDisplay(this.genre);
            }
        })
    }

    activeTagDisplay(genre) {
        activeTagDiv.innerHTML="";
        activeTags.forEach(activeTag => {
            const activedtag = document.createElement('li')
            activedtag.classList.add(genre+"-active")
            activedtag.innerText = activeTag;

            const i = document.createElement('i');
            i.classList.add("far","fa-times-circle");
            activedtag.appendChild(i);

            activeTagDiv.appendChild(activedtag);

            activedtag.addEventListener('click', () => {
                activeTags = activeTags.filter(e => e !== activeTag);
                console.log(activeTags);
                activedtag.remove();

                const list = document.querySelector("."+this.genre+"-list");
                const listEls = list.querySelectorAll("li");
        
                listEls.forEach(listEl => {
                    if (listEl.classList.contains(this.genre+'--selected') && !activeTags.includes(listEl.innerHTML)) {
                        listEl.classList.remove(this.genre+'--selected');
                    }
                });
            })
        });
    }
     
}