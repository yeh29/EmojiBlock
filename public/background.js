chrome.browserAction.onClicked.addListener(() =>
{
    chrome.runtime.openOptionsPage();
});

chrome.webRequest.onBeforeRequest.addListener(info => {
    if(enabled && !info.url.startsWith(emojiLink) && matchesFilters(info.url)) {
        return {redirectUrl: getRandEmoji()};
    } else {
        return;
    }
}, {urls: ["<all_urls>"]}, ["blocking"]);

chrome.storage.onChanged.addListener((changes, namespace) => {
    for(let key in changes) {
        if(key === "EBfilters" && namespace === "local") {
            filters = changes["EBfilters"].newValue;
        } else if(key === "EBemojis" && namespace === "local") {
            emojis = changes["EBemojis"].newValue;
        } else if(key === "EBexcluded" && namespace === "local") {
            excludedEmojis = changes["EBexcluded"].newValue;
        } else if(key === "EBenabled" && namespace === "local") {
            enabled = changes["EBenabled"].newValue;
        }
    }
});