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

//on complete fix css + remove other components?
//message passing to update filter + emoji prefs