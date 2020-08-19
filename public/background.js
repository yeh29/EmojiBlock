chrome.browserAction.onClicked.addListener(() =>
{
    chrome.runtime.openOptionsPage();
});

chrome.webRequest.onBeforeRequest.addListener(info => {
    if(matchesFilters(info.url)) {
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
        }
    }
});

//on complete fix css + remove other components?
//message passing to get data