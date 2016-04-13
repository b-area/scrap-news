var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.get('/articles', function(req, res){
	url = 'http://americansongwriter.com/features/articles/';
	
	request(url, function(error, response, html)
	{
		var news = [];
		
		if(!error){
			var $ = cheerio.load(html);
			$posts = $('.home-roll').children();

			var index = 0;
			$posts.each(function(i, elem) {
				
				var title, link, image, source;
				var json  = { title : "", link : "", image: "", source: ""};
				
				json.link 	= "http://americansongwriter.com" + $(this).find('a').attr('href');
				json.image  = $(this).find('img').attr('src');
				json.title  =  $(this).find('h4').text(); /*$(this).find('.blog-roll-footer').text();*/
				json.source = "www.americansongwriter.com";
				
				//console.log(json);
				
				if (json.title !== "Sponsor" && json.title !== ""){
					news[index] = json; 
					index = index + 1;
				}
			})
		}
		
		news.sort( function() { return 0.5 - Math.random() } );
		var valiny = {"articles": news.slice(0, 6)}
		res.send(valiny);
	})
})

var PORT = 3030;
app.listen(PORT);
console.log('Navigate to http://localhost:' + PORT +'/articles');
exports = module.exports = app;
