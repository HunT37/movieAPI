var express = require("express");
var app = express();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
var json = require('json');

const port = 3000;
const apiKey = '3f24cb9';

// Routing for movies resources
var movies = express.Router();
movies.get('/', function(req, res) {
    // Get full list of movies in database
    res.json(["movies"]);
});
movies.post('/', function(req, res) {
    // Get requested movie title
    var movieTitle = req.params.title;
    // Look for the title in database
    xhr.open('GET', `http://www.omdbapi.com/?apikey=${apiKey}&t${movieTitle}`, true);
	xhr.send(null);
	//console.log(xhr.status);
	//console.log(xhr.statusText);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var apiResponse = readBody(xhr);
            var movie_data = JSON.parse(apiResponse);
            res(movie_data);
        }
        else {
            res('Spmething went wrong.');
        }
    }
});
movies.get('/:id', function(req, res) {
    res.json(["movies"]);
});
app.use('/movies', movies);

// Routing for comment resources
var comments = express.Router();
comments.get('/', function(req, res) {

});
comments.post('/', function(req, res) {

});
comments.get('/:id', function(req, res) {

});
app.use('/comments', comments);

// Start application server
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});

function readBody(xhr) {
	var data;
	if (!xhr.responseType || xhr.responseType === "text") {
		data = xhr.responseText;
	} else if (xhr.responseType === "document") {
		data = xhr.responseXML;
	} else {
		data = xhr.response;
	}
	return data;
}

/*
    TODO
    MongoDB: https://www.mongodb.com/download-center
    Mongoose: https://mongoosejs.com/docs/index.html
    Mocha and Chai for test: https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
    ES6: http://kursjs.pl/kurs/es6/ecma-script-2015.php
    REST API: https://medium.com/@jeffandersen/building-a-node-js-rest-api-with-express-46b0901f29b6
    Usage of omdbapi: http://www.omdbapi.com/?apikey=3f24cb9&t=lamb | http://www.omdbapi.com/
    TypeScript: https://www.nettecode.com/typescript-od-podstaw/
    GIT: https://rogerdudler.github.io/git-guide/index.pl.html
*/