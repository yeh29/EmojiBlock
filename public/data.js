chrome.storage.local.get(["EBnumber"], result => {
    if(result.EBnumber == undefined) {
        chrome.storage.local.set({"EBnumber": 0});
    }
});

let filters = [];
chrome.storage.local.get(["EBfilters"], result => {
    if(result.EBfilters !== undefined) {
        filters = result.EBfilters;
    }
});

let emojis = [];
let excludedEmojis = [];
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
    if(result.EBexcluded !== undefined) {
        excludedEmojis = result.EBexcluded;
    }
});

// function addToFilters(filter) {
//     try {
//         new RegExp(filter);
//     } catch(error) {
//         return "Invalid Filter Regex Syntax";
//     }
//     if(!filters.includes(filter)) {
//         filters.push(filter);
//         chrome.storage.local.set({"EBfilters": filters});
//     } else {
//         return "Filter Already Exists";
//     }
//     return "OK";
// }

// function removeFromFilters(index) {
//     filters.splice(index, 1);
//     chrome.storage.local.set({"EBfilters": filters});
// }

// function addToExcluded(index) {
//     const emoji = emojis.splice(index, 1);
//     excludedEmojis.push(emoji[0]);
//     chrome.storage.local.set({"EBemojis": excludedEmojis});
// } 

// function removeFromExcluded(index) {
//     const emoji = excludedEmojis.splice(index, 1);
//     emojis.push(emoji[0]);
//     chrome.storage.local.set({"EBemojis": excludedEmojis});
// }

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