import API from "./API.js";
import SearchbarFilter from "./SearchBarFilter.js";
import Searchbar from "./SearchBarFilter.js";

let ingredientsActiveTags = [];
let ustensilesActiveTags = [];
let appareilActiveTags = [];

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
        const tag = document.createElement('li');
        tag.classList.add(this.genre+"-li");
        tag.innerText = this.name;

        this.searchType.appendChild(tag);

        tag.addEventListener('click', () => {
            if (this.genre === 'ingredients') {
                if(!ingredientsActiveTags.includes(this.name)) {
                    tag.classList.add(this.genre+'--selected');
                    ingredientsActiveTags.push(this.name);
                    this.ingredentsActive();
                    console.log(ingredientsActiveTags);
                } else {
                    tag.classList.remove(this.genre+'--selected');
                    ingredientsActiveTags = ingredientsActiveTags.filter(e => e !== this.name);
                    this.ingredentsActive();
                    console.log(ingredientsActiveTags);
                }
            }
            else if (this.genre === 'ustensiles') {
                if(!ustensilesActiveTags.includes(this.name)) {
                    tag.classList.add(this.genre+'--selected');
                    ustensilesActiveTags.push(this.name);
                    this.ustensilesActive();
                    console.log(ustensilesActiveTags);
                } else {
                    tag.classList.remove(this.genre+'--selected');
                    ustensilesActiveTags = ustensilesActiveTags.filter(e => e !== this.name);
                    this.ustensilesActive();
                    console.log(ustensilesActiveTags);
                }
            }
            else if (this.genre === 'appareil') {
                if(!appareilActiveTags.includes(this.name)) {
                    tag.classList.add(this.genre+'--selected');
                    appareilActiveTags.push(this.name);
                    this.appareilActive();
                    console.log(appareilActiveTags);
                } else {
                    tag.classList.remove(this.genre+'--selected');
                    appareilActiveTags = appareilActiveTags.filter(e => e !== this.name);
                    this.appareilActive();
                    console.log(appareilActiveTags);
                }
            }
        })
    }

    ingredentsActive() {
        const ingredientsUL = document.querySelector('.ingredientsUL');

        ingredientsUL.innerHTML="";
        ingredientsActiveTags.forEach(activeTag => {
            const activedtag = document.createElement('li')
            activedtag.classList.add("ingredients-active")
            activedtag.innerText = activeTag;

            const i = document.createElement('i');
            i.classList.add("far","fa-times-circle");
            activedtag.appendChild(i);

            ingredientsUL.appendChild(activedtag);

             activedtag.addEventListener('click', () => {
                ingredientsActiveTags = ingredientsActiveTags.filter(e => e !== activeTag);
                activedtag.remove();

                const list = document.querySelector(".ingredients-list");
                const listEls = list.querySelectorAll("li");
        
                listEls.forEach(listEl => {
                    if (listEl.classList.contains('ingredients--selected') && !ingredientsActiveTags.includes(listEl.innerHTML)) {
                        listEl.classList.remove('ingredients--selected');
                    }
                });
            })
        });
        activeTagDiv.appendChild(ingredientsUL);
    }

    ustensilesActive() {
        const ustensilesUL = document.querySelector('.ustensilesUL');
        
        ustensilesUL.innerHTML="";
        ustensilesActiveTags.forEach(activeTag => {
            const activedtag = document.createElement('li')
            activedtag.classList.add("ustensiles-active")
            activedtag.innerText = activeTag;

            const i = document.createElement('i');
            i.classList.add("far","fa-times-circle");
            activedtag.appendChild(i);

            ustensilesUL.appendChild(activedtag);

             activedtag.addEventListener('click', () => {
                ustensilesActiveTags = ustensilesActiveTags.filter(e => e !== activeTag);
                activedtag.remove();

                const list = document.querySelector(".ustensiles-list");
                const listEls = list.querySelectorAll("li");
        
                listEls.forEach(listEl => {
                    if (listEl.classList.contains('ustensiles--selected') && !ustensilesActiveTags.includes(listEl.innerHTML)) {
                        listEl.classList.remove('ustensiles--selected');
                    }
                });
            })
        });
        activeTagDiv.appendChild(ustensilesUL);
    }

    appareilActive() {
        const appareilUL = document.querySelector('.appareilUL');
        
        appareilUL.innerHTML="";
        appareilActiveTags.forEach(activeTag => {
            const activedtag = document.createElement('li')
            activedtag.classList.add("appareil-active")
            activedtag.innerText = activeTag;

            const i = document.createElement('i');
            i.classList.add("far","fa-times-circle");
            activedtag.appendChild(i);

            appareilUL.appendChild(activedtag);

             activedtag.addEventListener('click', () => {
                appareilActiveTags = appareilActiveTags.filter(e => e !== activeTag);
                activedtag.remove();

                const list = document.querySelector(".appareil-list");
                const listEls = list.querySelectorAll("li");
        
                listEls.forEach(listEl => {
                    if (listEl.classList.contains('appareil--selected') && !appareilActiveTags.includes(listEl.innerHTML)) {
                        listEl.classList.remove('appareil--selected');
                    }
                });
            })
        });
        activeTagDiv.appendChild(appareilUL);
    }  
}