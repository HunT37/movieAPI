# Project

movieAPI is REST API application and stores data about film. Data is donwloaded from www.omdbapi.com open API

## Used libraries

express.js -  Building RST API
bodyParser.js - To prase HTTP request body
json - Communication data format
mongoose.js - MongoDB database
XMLHttpRequest - To send HTTP request to omdbapi

### Endpoints

GET movies - Returns all movies from database
POST movies - Insert new movie with title given in request body

GET comments - Returns all comments from database
GET comments/:imdbID - Returns all comments set for chosen imdbID
SET comments - Insert new comment for movie with imdbID given in request body

## Authors

* **Janusz Erazmus** - [PurpleBooth](https://github.com/HunT37)