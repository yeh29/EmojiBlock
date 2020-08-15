let emojis = [];
let excludedEmojis = [];

fetch("emoji.json").then(response => response.json()).then(data => {
    emojis = data;
    chrome.storage.local.get(["EBemojis"], result => {
        if(result.EBemojis !== undefined) {
            excludedEmojis = result.EBemojis;
            excludedEmojis.forEach(emoji => {
                for(let i = 0; i < emojis.length; i++) {
                    if(emoji.title == emojis[i].title) {
                        emojis.splice(i, 1);
                        break;
                    }
                }
            });
        }
    });
});

function addToExcluded(index) {
    const emoji = emojis.splice(index, 1);
    excludedEmojis.push(emoji[0]);
    chrome.storage.local.set({"EBemojis": excludedEmojis});
} 

function removeFromExcluded(index) {
    const emoji = excludedEmojis.splice(index, 1);
    emojis.push(emoji[0]);
    chrome.storage.local.set({"EBemojis": excludedEmojis});
}

function getRandEmoji() {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    return emoji.url;
}