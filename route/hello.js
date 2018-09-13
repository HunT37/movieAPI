function getWelcome(req, res) {
    res.send(`
        <h2>Project</h2>

        <p>movieAPI is REST API application and stores data about film. Data is donwloaded from www.omdbapi.com open API</p>
        
        <h2>Used libraries</h2>
        
        <ul>
        <li>express.js -  Building RST API</li>
        <li>bodyParser.js - To prase HTTP request body</li>
        <li>json - Communication data format</li>
        <li>mongoose.js - MongoDB database</li>
        <li>XMLHttpRequest - To send HTTP request to omdbapi</li>
        </ul>
        
        <h2>Endpoints</h2>
        
        <ul>
        <li>GET movies - Returns all movies from database</li>
        <li>POST movies - Insert new movie with title given in request body</li>
        
        <li>GET comments - Returns all comments from database</li>
        <li>GET comments/:imdbID - Returns all comments set for chosen imdbID</li>
        <li>SET comments - Insert new comment for movie with imdbID given in request body</li>
        </ul>

        <h2>Tests</h2>
        <p>Tests are HTTP request to heroku app. You can run test with "node tests.js" in test/ folder.</p>

        <p>Example responses:</p>

        <p><b>testGetCommentsByID('tt0351283');</b></p>
        <p>TEST GET comments/:imdbID - imdbID: tt0351283 has 1 comments in database!</p>

        <p><b>testGetComments();</b></p>
        <p>TEST GET comments/ - We got 9 comments in database!</p>

        <p><b>testGetMovies();</b></p>
        <p>TEST GET movies/ - We got 8 movies in database!</p>

        <p><b>testPostMovies('Lamb');</b></p>
        <p>TEST POST movies/ - {"_id":"5b9ace8e6199780014874a14","imdbID":"tt3908598","title":"Lamb","year":2015,"rated":"R","released":"12 Jan 2016","runtime":"97 min","genre":"Drama","director":"Ross Partridge","writer":"Bonnie Nadzam (novel), Ross Partridge (screenplay), Ross Partridge","actors":"Ross Partridge, Oona Laurence, Jess Weixler, Tom Bower","plot":"When a man meets a young girl in a parking lot he attempts to help her avoid a bleak destiny by initiating her into the beauty of the outside world. The journey shakes them in ways neither expects.","language":"English","country":"USA","awards":"4 wins & 4 nominations.","__v":0}</p>

        <p><b>testPostComments('tt0351283', 'super film!');</b></p>
        <p>TEST POST comments/ - {"imdbID":"tt0351283","text":"super film!"}</p>

        <h2>Authors</h2>
        
        <p><b>Janusz Erazmus</b></p>
    `);
};

module.exports = { getWelcome };