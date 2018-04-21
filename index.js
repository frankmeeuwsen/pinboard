const fs = require("fs");
const request = require("request");
const utils = require ("daveutils");
const feedRead = require ("davefeedread");
const opmlRead = require("daveopml");

const timeOutSecs = 30;
const opmlTestfeed = "./data/feeds.opml";
const itemsToPostFile = "./data/itemsToPost.json";
const itemArray = [];

function readOPML(TheOPMLFeed){
		opmlRead.readOpmlFile(TheOPMLFeed, function(opmlFeed){
		if (opmlFeed == undefined) {
			console.log(err);
			}
		else {
			for (var i = 0; i < opmlFeed.subs.length; i++) {
				 readFeed(opmlFeed.subs[i].xmlurl)
				}
			}
	});
}

function readFeed(xmlUrlFeed){
	feedRead.parseUrl (xmlUrlFeed, timeOutSecs, function (err, theFeed) {
	if (err) {
		console.log (err.message);
		}
	else {
		console.log("============================================");
     console.log ("Title: " + theFeed.head.title + ".");
     console.log("============================================");
		for (var i = 0; i < theFeed.items.length; i++) {

			// Check if an item is already in the stored array

			//Loop over the rest items and store each item in the array
				console.log(theFeed.items [i].title,': ',theFeed.items [i].link);
			 itemArray.push({
				 guid:theFeed.items [i].guid,
				 title:theFeed.items [i].title,
				 pubdate:theFeed.items [i].pubdate,
				 link:theFeed.items [i].link,
				 description:theFeed.items [i].description
			 })
			}
			//Save the array locally
			// console.log(itemArray);
			fs.appendFileSync(itemsToPostFile,utils.jsonStringify (itemArray))
		}
	});
}

function removeFeed(TheFile){
	fs.stat(TheFile, function(err,stat){
		if(err == null){
			//als bestand bestaat
			console.log('File exists', TheFile);
			//gooi het dan weg
			fs.unlink(TheFile, (err) => {
  			if (err) throw err;
  			console.log(TheFile, 'was deleted');
				});
		} else if(err.code == 'ENOENT') {
			//bestand bestaat niet
		} else {
				console.log('Some error:', err.code);
		}
	})
	//doe anders niets
}

removeFeed(itemsToPostFile);
readOPML(opmlTestfeed);
