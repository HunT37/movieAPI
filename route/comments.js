let dbComment = require('../model/comments.js');
let dbMovie = require('../model/movies.js');

// Get all comments from database
function getComments(req, res) {
    // Get full list of comments in database
    dbComment.find(function (err, all_comments) {
        if (err) return console.error(err);
        res.json(all_comments);
    })
};

// Get comment to movie with given imdbID
function getCommentByID(req, res) {
    // Get full list of comments for given movie ID
    console.log(req.params.imdbID);
    dbComment.find({ imdbID: req.params.imdbID }, function (err, all_comments) {
        if (err) return console.error(err);
        res.json(all_comments);
    })
};

// Add new comment to movie with given imdbID
function postComment(req, res) {
    if (req.body.imdbID == undefined || req.body.text == undefined) {
        res.json({"error": "imdbID or TEXT is not set!"});
        res.end();
    }
    else {
        let movie_id = req.body.imdbID;
        let comment_text = req.body.text;
        //console.log(movie_id);
        dbMovie.find({ imdbID: movie_id }, function (err, found) {
            if (found.length == 0) {
                res.json({"error": "movie not found"});
            }
            else {
                let new_comment = {"imdbID": movie_id, "text": comment_text};
                dbComment(new_comment).save(function (err, new_comment) {
                    if (err) return console.error(err);
                    console.log(`SAVED: ${new_comment.imdbID}: ${new_comment.text}!`);
                    res.json({"imdbID": movie_id, "text": comment_text});
                res.end();
                });  
            }
        });
    }
};

module.exports = { getComments, getCommentByID, postComment };