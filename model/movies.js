let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let movieSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Movies', movieSchema);