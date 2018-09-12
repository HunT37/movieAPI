var express = require("express");
var app = express();
var bodyParser = require('body-parser')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
var json = require('json');
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://movieapi_user:movieapi@movieapi-6fcnm.mongodb.net/movies_database?retryWrites=true');

const PORT = 3000;
const API_KEY = '3f24cb9';
 
// parse application/json
app.use(bodyParser.json());

// Start application server
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log(`Connected to database!`);
});

var movieSchema = new mongoose.Schema({
    imdbID: String,
    title: String,
    year: Number,
    rated: String,
    released: String,
    runtime: String,
    genre: String,
    director: String,
    writer: String,
    actors: String,
    plot: String,
    language: String,
    country: String,
    awards: String
});
var dbMovie = mongoose.model('Movies', movieSchema);

var commentSchema = new mongoose.Schema({
    imdbID: String,
    text: String
});
var dbComment = mongoose.model('Comments',commentSchema);

var index = express.Router();
index.get('/', function(req, res) {
    res.json({"hello": "world"});
});
app.use('/', index);

var movies = express.Router();
movies.get('/', function(req, res) {
    // Get full list of movies in database
    dbMovie.find(function (err, all_movies) {
        if (err) return console.error(err);
        res.json(all_movies);
    })
});
movies.post(`/`, function(req, res) {
    // Get requested movie title
    if (req.body.title == undefined) {
        res.json(`Title is not set!`);
        res.end();
    }
    else {
        var movieTitle = req.body.title;
        // Look for the title in database
        xhr.open('GET', `http://www.omdbapi.com/?apikey=${API_KEY}&t=${movieTitle}`, true);
        xhr.send(null);
        //console.log(xhr.status);
        //console.log(xhr.statusText);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                var apiResponse = readBody(xhr);
                var movie_data = JSON.parse(apiResponse);
                //console.log(movie_data);
                var new_movie = {
                    imdbID: movie_data.imdbID,
                    title: movie_data.Title,
                    year: movie_data.Year,
                    rated: movie_data.Rated,
                    released: movie_data.Released,
                    runtime: movie_data.Runtime,
                    genre: movie_data.Genre,
                    director: movie_data.Director,
                    writer: movie_data.Writer,
                    actors: movie_data.Actors,
                    plot: movie_data.Plot,
                    language: movie_data.Language,
                    country: movie_data.Country,
                    awards: movie_data.Awards
                };
                addMovie(new_movie);
                res.json(new_movie);
                res.end();
            }
        }
    }
});
app.use('/movies', movies);

// Routing for comment resources
var comments = express.Router();
comments.get('/', function(req, res) {
    // Get full list of comments in database
    dbComment.find(function (err, all_comments) {
        if (err) return console.error(err);
        res.json(all_comments);
    })
});
comments.get('/:id', function(req, res) {
    // Get full list of comments in database
    dbComment.find({ imdbID: req.param.id }, function (err, all_comments) {
        if (err) return console.error(err);
        res.json(all_comments);
    })
});
comments.post('/', function(req, res) {
    if (req.body.id == undefined || req.body.text == undefined) {
        res.json({"error": "ID or TEXT is not set!"});
        res.end();
    }
    else {
        var movie_id = req.body.id;
        var comment_text = req.body.text;
        console.log(movie_id);
        dbMovie.find({ imdbID: movie_id }, function (err, found) {
            if (found === null) {
                res.json({"error": "movie not found"});
            }
            else {
                addComment({"id": movie_id, "text": comment_text});
                res.json({"id": movie_id, "text": comment_text});
                res.end();
            }
        });
    }
});
app.use('/comments', comments);

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

function addMovie(movie) {
    var new_movie = new dbMovie(movie);

    new_movie.save(function (err, new_movie) {
        if (err) return console.error(err);
        console.log(`SAVED: ${new_movie.title}!`);
    });
}

function addComment(comment) {
    var new_comment = new dbComment(comment);

    new_comment.save(function (err, new_comment) {
        if (err) return console.error(err);
        console.log(`SAVED: ${new_comment.id}: ${new_comment.text}!`);
    });
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