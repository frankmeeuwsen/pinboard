var Pinboard = require('node-pinboard');
var api_token = process.env.pinboard;
var pinboard = new Pinboard(api_token);


	var options = {
		tags: 'microlink',
   };
  //
	// pinboard.add(options, function(err, res) {
  //   	console.log(res);
  //   	//{ result_code: 'done' }
	// });
	// pinboard.recent({tag: 'microlink'}, function(err, res) {
	// 	console.log(res);
	// 		//date: date,
  // 			//user: 'user',
  // 			//posts:
  //  			//[ { href: 'https://github.com/mikeal/request',
  //     		//description: 'mikeal / request',
  //     		//extended: '',
  //     		//meta: 'meta',
  //     		//hash: 'hash',
  //     		//time: 'time',
  //     		//shared: 'no',
  //     		//toread: 'yes',
  //     		//tags: 'git node-pinboard test' } ] }
	// });

function microLinkArray(result){
  var array = [];
  var as = JSON.parse(result);
  as.forEach(function(posts){
    array.push(posts.href);
  });
}

pinboard.get(function(err, body){
//  var as = JSON.parse(body.posts);
//microLinkArray(body);
console.log(body.posts[1].description);
});
