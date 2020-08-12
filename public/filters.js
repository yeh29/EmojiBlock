let filters = ["https://www.gstatic.com/youtube/img/promos/*"];

//chrome on launch load existing filters
//remember to add and remove to local storage
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

function addToFilters(filter) {

}

function removeFromFilters(filter) {

}

function matchesFilters(url) {
    for(let i = 0; i < filters.length; i++) {
        if(url.match(filters[i]) !== null) {
            return true;
        }
    }
    return false;
}