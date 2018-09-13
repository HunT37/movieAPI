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
        
        <h2>Authors</h2>
        
        <b>Janusz Erazmus</b>
    `);
};

module.exports = { getWelcome };