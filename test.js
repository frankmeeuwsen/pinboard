const utils = require ("daveutils");
const feedRead = require ("davefeedread");
const fs = require("fs");
const opmlRead = require("daveopml");
const request = require("request");
const timeOutSecs = 30;

const urlTestFeed = "https://www.inoreader.com/stream/user/1006530244/tag/user-favorites";
const opmlTestfeed = "./data/feeds.opml"

readOPML();
//readFeed();

function readOPML(){
		opmlRead.readOpmlFile(opmlTestfeed, function(err,opmlFeed){
		if (err) {
			console.log("ERROR");
			console.log("============================================");
			console.log(err);
			console.log("============================================");
			}
		else {
			console.log("SUCCES");
			console.log("============================================");
	     console.log (+opmlFeed);
	     console.log("============================================");
			// for (var i = 0; i < theFeed.items.length; i++) {
	    //    console.log(theFeed.items [i].title);
	    //    fs.appendFileSync('./data/inofeed.json',utils.jsonStringify (theFeed.items [i]))
			// 	}
			}
	});
}

function readFeed()
{
	feedRead.parseUrl (urlTestFeed, timeOutSecs, function (err, theFeed) {
	if (err) {
		console.log (err.message);
		}
	else {
     console.log ("Title: " + theFeed.head.title + ".");
     console.log ("Link: " + theFeed.head.link + ".");
     console.log("Length: " + theFeed.items.length + ".");
     console.log("============================================");
		for (var i = 0; i < theFeed.items.length; i++) {
       console.log(theFeed.items [i].title);
       fs.appendFileSync('./data/inofeed.json',utils.jsonStringify (theFeed.items [i]))
			}
		}
});}
