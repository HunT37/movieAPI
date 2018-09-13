const request = require('request');

function testGetMovies() {
    request.get(
        'https://moviedatabase.herokuapp.com/movies',
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let res_json = JSON.parse(body);
                console.log(`TEST GET movies/ - We got ${res_json.length} movies in database!`);
            }
        }
    );
}

function testPostMovies(set_title) {
    request.post(
        'https://moviedatabase.herokuapp.com/movies',
        { json: { title: set_title } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let res_json = JSON.stringify(body);
                console.log(`TEST POST movies/ - ${res_json}`)
            }
        }
    );
}

function testGetComments() {
    request.get(
        'https://moviedatabase.herokuapp.com/comments',
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let res_json = JSON.parse(body);
                console.log(`TEST GET comments/ - We got ${res_json.length} comments in database!`);
            }
        }
    );
}

function testGetCommentsByID(set_id) {
    request.get(
        `https://moviedatabase.herokuapp.com/comments/${set_id}`,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let res_json = JSON.parse(body);
                console.log(`TEST GET comments/:imdbID - imdbID: ${set_id} has ${res_json.length} comments in database!`);
            }
        }
    );
}

function testPostComments(set_id, set_text) {
    request.post(
        'https://moviedatabase.herokuapp.com/comments',
        { json: { imdbID: set_id, text: set_text } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let res_json = JSON.stringify(body);
                console.log(`TEST POST comments/ - ${res_json}`)
            }
        }
    );
}

testGetMovies();
testPostMovies('Lamb');
testGetComments();

testGetCommentsByID('tt0351283');
testPostComments('tt0351283', 'super film!');