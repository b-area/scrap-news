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

app.get('/news', function(req, res)
{
	url = 'http://www.music-news.com/api/news/list?country=UK&page=1';
	
	request(url, function(error, response, body)
	{
		var news = [];
		
		if(!error && response.statusCode == 200){
			
						
			var obj = JSON.parse(body);
			var arr = obj.results;
			
			for(var i=0;i<arr.length;i++){
				var title, link, thumbnail, publishDate, age, source;
				var json  = { title : "", link : "", thumbnail: "", publishDate: "", age: "", source: ""};
				
				json.link = "http://www.music-news.com" + arr[i].url;
				json.title = arr[i].headline;
				json.thumbnail = "http://www.music-news.com" + arr[i].thumbnail;
				json.publishDate = arr[i].publishDate;
				json.age = arr[i].age;
				json.source = "www.music-news.com";
				
				news[i] = json;
			}
	
		}
		
		var valiny = {"news": news.slice(0, 7)}
		res.send(valiny);
	})
})



app.listen('9090')
console.log('Magic happens on port 9090');
exports = module.exports = app;
