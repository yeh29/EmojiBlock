const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');
const util = require("util");

JSDOM.fromURL("https://emojipedia.org/google/").then(dom => {
  const emojis = Array.from(dom.window.document.querySelectorAll("ul.emoji-grid > li > a > img"));
  fs.appendFileSync("./emojis.json", "[");
  for(var i = 0; i < emojis.length; i++) {
	  let toWrite = "{\"title\": " + "\"" + emojis[i].title + "\",\"url\": " + "\"" + emojis[i].src + "\"}";
    if(emojis[i].src === "https://emojipedia.org/static/img/lazy.svg") {
      toWrite = "{\"title\": " + "\"" + emojis[i].title + "\",\"url\": " + "\"" + emojis[i].dataset.src + "\"}";
    } 
	  if(i + 1 != emojis.length) {
		  toWrite = toWrite + ",";
	  }
	  fs.appendFileSync("./emojis.json", toWrite);
  }
  fs.appendFileSync("./emojis.json", "]");
});