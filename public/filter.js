let filters = [];
chrome.storage.local.get(["EBfilters"], result => {
    if(result.EBfilters !== undefined) {
        filters = result.EBfilters;
    }
});

function addToFilters(filter) {
    try {
        new RegExp(filter);
    } catch(error) {
        return "Invalid Filter Regex Syntax";
    }
    if(!filters.includes(filter)) {
        filters.push(filter);
        chrome.storage.local.set({"EBfilters": filters});
    } else {
        return "Filter Already Exists";
    }
    return "OK";
}

function removeFromFilters(index) {
    filters.splice(index, 1);
    chrome.storage.local.set({"EBfilters": filters});
}

function matchesFilters(url) {
    for(let i = 0; i < filters.length; i++) {
        if(url.match(filters[i]) !== null) {
            return true;
        }
    }
    return false;
}