var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var session = require('express-session');
var mysql = require('mysql2');


var connection = mysql.createConnection({
                host: '34.70.249.172',
                user: 'root',
                password: 'test1234',
                database: 'classicmodels'
});

connection.connect;

var app = express();



app.get('/movies', (request, response) => {
    var sql = "SELECT * FROM Movie m WHERE";
    var conditions = [];
    var age_rating = request.query.age_rating;
    var year = request.query.year;
    var netflix = request.query.netflix;
    var hulu = request.query.hulu;
    var disneyplus = request.query.disneyplus;
    var primevideo = request.query.primevideo;
    var score = request.query.score;
    if (age_rating != null) {
        conditions.push(`(m.AgeRating) == ${age_rating}`);
    }
    if (year != null) {
        conditions.push(`(m.Year) == ${year}`)
    }
    var platform = ""
    if (netflix) {
        conditions.push(`(m.Year) == ${year}`)
    }
    
    
    

});

app.get('/list', (request, response) => {
    var blackList = request.query.blackList;
    var sql;
    if (blackList) {
        sql = `SELECT * FROM BlackList b WHERE b.ListId = ${listId}`
    } else {
        sql = `SELECT * FROM WatchList w WHERE w.ListId = ${listId}`
    }
    connection.query(sql, (err, result) => {
        if (err) {
            response.status(400).send('Error in database operation');
        }
        response.send(result);
    });
});
app.post('/list', (request, response) => {
    var blackList = request.query.blackList;
    var listId = request.query.listId;
    var userId = request.query.UserId;
    var sql;
    if (blackList) {
        sql = `INSERT INTO BlackList(ListId, UserId) VALUES (${listId}, ${userId}); INSERT INTO MovieList(ListId) VALUES (${listId})`;
    } else {
        sql = `INSERT INTO WatchList(ListId, UserId) VALUES (${listId}, ${userId}; INSERT INTO MovieList(ListId) VALUES (${listId}))`;
    }
    connection.query(sql, (err, result) => {
        if (err) {
            response.status(400).send('Error in database operation');
        }
    });

});


app.get('/listmovie', (request, response) => {
    var listId = request.query.listId;
    var sql = `SELECT * FROM Movies m Join MovieListMovieAssociation a on  m.MovieId = a.MovieId WHERE a.ListId = ${listId}`;
    connection.query(sql, (err, result) => {
        if (err) {
            response.status(400).send('Error in database operation');
        }
        response.send(result);
    });
});
app.post('/listmovie', (request, response) => {
    var listId = request.query.listId;
    var movieId = request.query.movieId;
    var sql = `INSERT INTO MovieListMovieAssociation(MovieId, ListId) VALUES (${movieId}, ${listId})`;
    connection.query(sql, (err, result) => {
        if (err) {
            response.status(400).send('Error in database operation');
        }
    });
});

