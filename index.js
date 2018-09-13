const express = require("express");
let app = express();
const bodyParser = require('body-parser')
const json = require('json');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://movieapi_user:movieapi@movieapi-6fcnm.mongodb.net/movies_database?retryWrites=true');

let movies = require('./route/movies.js');
let comments = require('./route/comments.js');

const PORT = 3000;
 
// parse application/json
app.use(bodyParser.json());

// Start application server
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});

// Open MongoDB connection
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log(`Connected to database!`);
});

// Set routes for movies a comments controlers
app.route("/movies")
    .get(movies.getMovies)
    .post(movies.postMovie);
app.route("/comments/")
    .get(comments.getComments)
    .post(comments.postComment)
app.route("/comments/:imdbID")
    .get(comments.getCommentByID)


// Simple Homepage
let index = express.Router();
index.get('/', function(req, res) {
    res.json({"hello": "world"});
});
app.use('/', index);