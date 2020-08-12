chrome.browserAction.onClicked.addListener(() =>
{
    chrome.runtime.openOptionsPage();
});

chrome.webRequest.onBeforeRequest.addListener(info => {
    const redirect = matchesFilters(info.url);
    console.log(info.url);
    console.log(redirect);
    const newUrl = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/241/grinning-face_1f600.png";
    if(redirect) {
        return {redirectUrl: newUrl};
    } else {
        return;
    }
}, {urls: ["<all_urls>"]}, ["blocking"]);

//on complete fix css + remove other frames