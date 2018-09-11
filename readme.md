We’d like you to build simple REST API for us - a basic movie database interacting with external API. Here’s full specification of endpoints that we’d like it to have:

POST /movies:
Request body should contain only movie title, and its presence should be validated.
Based on passed title, other movie details should be fetched from http://www.omdbapi.com/ (or other similar, public movie database) - and saved to application database.
Request response should include full movie object, along with all data fetched from external API.
GET /movies:
Should fetch list of all movies already present in application database.
Additional filtering, sorting is fully optional (BONUS points)
POST /comments:
Request body should contain ID of movie already present in database, and comment text body.
Comment should be saved to application database and returned in request response.
GET /comments:
Should fetch list of all comments present in application database.
Should allow filtering comments by associated movie, by passing its ID.