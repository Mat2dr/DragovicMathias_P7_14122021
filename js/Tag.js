import API from "./API.js";
import SearchbarFilter from "./SearchBarFilter.js";
import Searchbar from "./SearchBarFilter.js";
import Filter from "./Filter.js";

let ingredientsActiveTags = [];
let ustensilesActiveTags = [];
let appareilActiveTags = [];

const rechercheDiv = document.querySelector('.recherche-inputs');
const activeTagDiv = document.querySelector('.tags-active');

export default class Tag {
    
    name;
    searchType;
    genre;
    filter;

    constructor(name, searchType, genre, filter) {
        this.name = name;
        this.searchType = searchType;
        this.genre = genre;
        this.filter = filter;
    }

    /*--------- AFFICHER LA LISTE DE TAGS ---------*/

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
                } else {
                    tag.classList.remove(this.genre+'--selected');
                    ingredientsActiveTags = ingredientsActiveTags.filter(e => e !== this.name);
                    this.ingredentsActive();
                }
            }
            else if (this.genre === 'ustensiles') {
                if(!ustensilesActiveTags.includes(this.name)) {
                    tag.classList.add(this.genre+'--selected');
                    ustensilesActiveTags.push(this.name);
                    this.ustensilesActive();
                } else {
                    tag.classList.remove(this.genre+'--selected');
                    ustensilesActiveTags = ustensilesActiveTags.filter(e => e !== this.name);
                    this.ustensilesActive();
                }
            }
            else if (this.genre === 'appareils') {
                if(!appareilActiveTags.includes(this.name)) {
                    tag.classList.add(this.genre+'--selected');
                    appareilActiveTags.push(this.name);
                    this.appareilActive();
                } else {
                    tag.classList.remove(this.genre+'--selected');
                    appareilActiveTags = appareilActiveTags.filter(e => e !== this.name);
                    this.appareilActive();
                }
            }
            this.filter.updateFilter(ingredientsActiveTags, ustensilesActiveTags, appareilActiveTags);
            this.filter.filter();
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
                this.filter.updateFilter(ingredientsActiveTags, ustensilesActiveTags, appareilActiveTags);
                this.filter.filter();

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
                this.filter.updateFilter(ingredientsActiveTags, ustensilesActiveTags, appareilActiveTags);
                this.filter.filter();

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
        const appareilUL = document.querySelector('.appareilsUL');
        
        appareilUL.innerHTML="";
        appareilActiveTags.forEach(activeTag => {
            const activedtag = document.createElement('li')
            activedtag.classList.add("appareils-active")
            activedtag.innerText = activeTag;

            const i = document.createElement('i');
            i.classList.add("far","fa-times-circle");
            activedtag.appendChild(i);

            appareilUL.appendChild(activedtag);

             activedtag.addEventListener('click', () => {
                appareilActiveTags = appareilActiveTags.filter(e => e !== activeTag);
                activedtag.remove();
                this.filter.updateFilter(ingredientsActiveTags, ustensilesActiveTags, appareilActiveTags);
                this.filter.filter();

                const list = document.querySelector(".appareils-list");
                const listEls = list.querySelectorAll("li");
        
                listEls.forEach(listEl => {
                    if (listEl.classList.contains('appareils--selected') && !appareilActiveTags.includes(listEl.innerHTML)) {
                        listEl.classList.remove('appareils--selected');
                    }
                });
            })
        });
        activeTagDiv.appendChild(appareilUL);
    }  
}