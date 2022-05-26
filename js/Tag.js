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
    }
     
}