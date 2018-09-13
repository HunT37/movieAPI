let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let commentSchema = new mongoose.Schema({
    imdbID: String,
    text: String
});

module.exports = mongoose.model('Comments', commentSchema);