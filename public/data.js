const emojiLink = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/72/google/241/"
let filters = [];
let emojis = [];
let excludedEmojis = [];
let enabled = true;

chrome.storage.local.get(["EBnumber"], result => {
    if(result.EBnumber == undefined) {
        chrome.storage.local.set({"EBnumber": 0});
    }
});

chrome.storage.local.get(["EBenabled"], result => {
    if(result.EBenabled == undefined) {
        chrome.storage.local.set({"EBenabled": true});
    } else {
        enabled = result.EBenabled;
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
            emojis = data.sort((a, b) => (a.title > b.tile)? 1 : ((b.title > a.title)? -1 : 0));
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