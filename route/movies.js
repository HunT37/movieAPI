let dbMovie = require('../model/movies.js');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let xhr = new XMLHttpRequest();

const API_KEY = '3f24cb9'; // My omdbapi API key

// Get full list of movies in database
function getMovies(req, res) {
    dbMovie.find(function (err, all_movies) {
        if (err) return console.error(err);
        res.json(all_movies);
    })
};

// Insert new movie to database if already not exists
function postMovie(req, res) {
    // Get requested movie title
    if (req.body.title == undefined) {
        res.json(`Title is not set!`);
        res.end();
    }
    else {
        let movieTitle = req.body.title;
        // Look for the title in database
        xhr.open('GET', `http://www.omdbapi.com/?apikey=${API_KEY}&t=${movieTitle}`, true);
        xhr.send(null);
        //console.log(xhr.status);
        //console.log(xhr.statusText);

        // On response ready
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                let apiResponse = readBody(xhr);
                let movie_data = JSON.parse(apiResponse);
                //console.log(movie_data);
                // Parse downloaded data from API
                let new_movie = {
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
                // Check if movie is already in database
                dbMovie.find({ title: new_movie.title }, function (err, found) {
                    if (found.length != 0) {
                        res.json({"error": "movie already exists!"});
                    }
                    else {
                        // If not, insert new row to database
                        dbMovie(new_movie).save(function (err, new_movie) {
                            if (err) return console.error(err);
                            console.log(`SAVED: ${new_movie.title}!`);
                            res.json(new_movie);
                            res.end();
                        });
                    }
                })
            }
        }
    }
};

function readBody(xhr) {
	let data;
	if (!xhr.responseType || xhr.responseType === "text") {
		data = xhr.responseText;
	} else if (xhr.responseType === "document") {
		data = xhr.responseXML;
	} else {
		data = xhr.response;
	}
	return data;
}

module.exports = { getMovies, postMovie };