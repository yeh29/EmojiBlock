let filters = [];
let emojis = [];
let excludedEmojis = [];

chrome.storage.local.get(["EBnumber"], result => {
    if(result.EBnumber == undefined) {
        chrome.storage.local.set({"EBnumber": 0});
    }
});

chrome.storage.local.get(["EBfilters"], result => {
    if(result.EBfilters == undefined) {
        chrome.storage.local.set({"EBfilters": []});
    } else {
        filters = result.EBfilters;
    }
});

chrome.storage.local.get(["EBemojis"], result => {
    if(result.EBemojis == undefined) {
        fetch("emoji.json").then(response => response.json()).then(data => {
            emojis = data;
            chrome.storage.local.set({"EBemojis": emojis});
        });
    } else {
        emojis = result.EBemojis;
    }
});
chrome.storage.local.get(["EBexcluded"], result => {
    if(result.EBexcluded == undefined) {
        chrome.storage.local.set({"EBexcluded": []});
    } else {
        excludedEmojis = result.EBexcluded;
    }
});

function matchesFilters(url) {
    for(let i = 0; i < filters.length; i++) {
        if(url.match(filters[i]) !== null) {
            chrome.storage.local.get(["EBnumber"], result => {
                chrome.storage.local.set({"EBnumber": result.EBnumber + 1});
            });
            return true;
        }
    }
    return false;
}

function getRandEmoji() {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    return emoji.url;
}