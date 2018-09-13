# Project

movieAPI is REST API application and stores data about film. Data is donwloaded from www.omdbapi.com open API

## Used libraries

express.js -  Building RST API<br/>
bodyParser.js - To prase HTTP request body<br/>
json - Communication data format<br/>
mongoose.js - MongoDB database<br/>
XMLHttpRequest - To send HTTP request to omdbapi<br/>

### Endpoints

GET movies - Returns all movies from database<br/>
POST movies - Insert new movie with title given in request body<br/>

GET comments - Returns all comments from database<br/>
GET comments/:imdbID - Returns all comments set for chosen imdbID<br/>
SET comments - Insert new comment for movie with imdbID given in request body<br/>

### Tests
Tests are HTTP request to heroku app. You can run test with "node tests.js" in test/ folder.<br/>
Example responses:<br/>

testGetCommentsByID('tt0351283');
TEST GET comments/:imdbID - imdbID: tt0351283 has 1 comments in database!<br/>

testGetComments();
TEST GET comments/ - We got 9 comments in database!<br/>

testGetMovies();
TEST GET movies/ - We got 8 movies in database!<br/>

testPostMovies('Lamb');
TEST POST movies/ - {"_id":"5b9ace8e6199780014874a14","imdbID":"tt3908598","title":"Lamb","year":2015,"rated":"R","released":"12 Jan 2016","runtime":"97 min","genre":"Drama","director":"Ross Partridge","writer":"Bonnie Nadzam (novel), Ross Partridge (screenplay), Ross Partridge","actors":"Ross Partridge, Oona Laurence, Jess Weixler, Tom Bower","plot":"When a man meets a young girl in a parking lot he attempts to help her avoid a bleak destiny by initiating her into the beauty of the outside world. The journey shakes them in ways neither expects.","language":"English","country":"USA","awards":"4 wins & 4 nominations.","__v":0}<br/>

testPostComments('tt0351283', 'super film!');
TEST POST comments/ - {"imdbID":"tt0351283","text":"super film!"}<br/>

## Authors

* **Janusz Erazmus**
