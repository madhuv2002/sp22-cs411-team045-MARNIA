var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
const res = require('express/lib/response');
const req = require('express/lib/request');
const cors = require('cors');


var connection = mysql.createConnection({
                host: '34.70.249.172',
                user: 'raghav',
                password: 'flixfind123',
                database: 'flixfind'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

var app = express();
app.use(cors());


app.get('/', (request, response) => {
    response.send('Hello');
}
)

app.get('/movies', (request, response) => {
    var sql = "SELECT * FROM Movie m";
    var conditions = [];
    var search = request.query.search;
    var age_rating = request.query.age_rating;
    var min_year = request.query.min_year;
    var max_year = request.query.max_year;
    var netflix = request.query.netflix;
    var hulu = request.query.hulu;
    var disneyplus = request.query.disneyplus;
    var primevideo = request.query.primevideo;
    var score = request.query.score;
    if (search != null) {
        conditions.push(`(m.Title LIKE '${search}%')`)
    }
    if (age_rating != null) {
        conditions.push(`(m.AgeRating = '${age_rating}')`);
    }
    if (min_year != null && max_year != null) {
        conditions.push(`(m.Year >= ${min_year}) AND (m.Year <= ${max_year})`);
    }
    if (netflix == 1) {
        conditions.push(`(EXISTS(SELECT * FROM MoviePlatformAssociation a WHERE a.MovieId = m.MovieId and a.PlatformName = 'Netflix'))`);
    }
    if (hulu == 1) {
        conditions.push(`(EXISTS(SELECT * FROM MoviePlatformAssociation a1 WHERE a1.MovieId = m.MovieId and a1.PlatformName = 'Hulu'))`);
    }
    if (disneyplus == 1) {
        conditions.push(`(EXISTS(SELECT * FROM MoviePlatformAssociation a2 WHERE a2.MovieId = m.MovieId and a2.PlatformName = 'Disney+'))`);
    }
    if (primevideo == 1) {
        conditions.push(`(EXISTS(SELECT * FROM MoviePlatformAssociation a3 WHERE a3.MovieId = m.MovieId and a3.PlatformName = 'Prime Video'))`);
    }
    if (score != null) {
        conditions.push(`(m.Score >= ${score})`);
    }

    

    for (let i = 0; i < conditions.length; i++) {
        if (i == 0) {
            sql += " WHERE ";
        }
        sql += conditions[i] + " ";
        if (i != conditions.length - 1) {
            sql += "AND ";
        }
    }


    
    sql += " ORDER BY m.Score desc"
    console.log(sql);

    connection.query(sql, (err, result) => {
        if (err) {
            response.status(400).send('Error in database operation');
        }
        response.send(result);
    });
});

app.get('/list', (request, response) => {
    var blackList = request.query.blackList;
    var listId = request.query.listId;
    var sql;
    if (listId == null) {
        sql = `SELECT * FROM MovieList m`
    } else {
        if (blackList) {
            sql = `SELECT * FROM BlackList b WHERE b.ListId = ${listId}`
        } else {
            sql = `SELECT * FROM WatchList w WHERE w.ListId = ${listId}`
        }
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
        sql = `INSERT INTO MovieList(ListId) VALUES (${listId}); INSERT INTO BlackList(ListId, UserId) VALUES (${listId}, ${userId}) `;
    } else {
        sql = `INSERT INTO MovieList(ListId) VALUES (${listId}); INSERT INTO WatchList(ListId, UserId) VALUES (${listId}, ${userId})`;
    }
    console.log(sql);
    connection.query(sql, (err, result) => {
        if (err) {
            response.status(400).send('Error in database operation');
        }
        console.log('record inserted');
        res.redirect('/');
    
    });

});


app.get('/listmovie', (request, response) => {
    var listId = request.query.listId;
    if (listId == null) {
        var sql = `SELECT * FROM MovieListMovieAssociation a`;
    } else {
        var sql = `SELECT m.Title FROM Movies m Join MovieListMovieAssociation a on  m.MovieId = a.MovieId WHERE a.ListId = ${listId}`;
    }
    console.log(sql);
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
        console.log('record inserted');
    });
});
app.delete('/listmovie', (request, response) => {
   var listId = request.query.listId;
   var movieId = request.query.movieId;
   var sql = `DELETE FROM MovieListMovieAssociation a WHERE a.ListId = ${listId} AND a.MovieId = ${movieId}`;
   connection.query(sql, (err, result) => {
       if (err) {
           response.status(400).send('Error in database operation');
       }
       response.send('Got a DELETE request at/listmovie');
   });
});

app.get('/platforms', (request, response) => {
    var sql = "SELECT * FROM MoviePlatformAssociation a"
    console.log(sql);

    connection.query(sql, (err, result) => {
        if (err) {
            response.status(400).send('Error in database operation');
        }
        console.log(response);
        response.send(result);
        
    });
    
});

// app.get('/ratings', (request, response) => {
// 	var movieId = request.query.movieId;
// 	var userId = request.query.userId;
	
// 	var sql = `SELECT * FROM Rating r WHERE r.UserId = ${userId} AND r.MovieId = ${movieId}`;
//     connection.query(sql, (err, result) => {
//         if (err) {
//             response.status(400).send('Error in database operation');
//         }
//         response.send(result);
//     });
// });

// app.post('/ratings', (request, response) => {
//     var userId = request.query.userId;
// 	   var movieId = request.query.movieId;
//     var dateTime = request.query.dateTime;
//     var ratingScore = request.query.ratingScore;
	
// 	   var sql = `INSERT INTO Rating(UserId, MovieId, DateTime, Score) VALUES (${userId}, ${movieId}, ${dateTime}, ${ratingScore})`;
//     connection.query(sql, (err, result) => {
//         if (err) {
//             response.status(400).send('Error in database operation');
//         }
//         console.log('record inserted');
//         response.send('Got a POST request');
//     });
// });

// app.put('/ratings', (request, response) => {
//     var movieId = request.query.movieId;
//     var userId = request.query.userId;
//     var updatedRating = request.query.updatedRating;
//     var sql = `UPDATE Rating r SET r.Score = ${updatedRating} WHERE r.UserId = ${userId} AND r.MovieId = ${movieId}`;
//     connection.query(sql, (err, result) => {
//         if (err) {
//             response.status(400).send('Error in database operation');
//         }
//         response.send('Got a PUT request');
//     });
// });

// app.delete('/ratings', (request, response) => {
//    var movieId = request.query.movieId;
//    var userId = request.query.userId;
//    var sql = `DELETE FROM Rating r WHERE r.UserId = ${userId} AND r.MovieId = ${movieId}`;
//    connection.query(sql, (err, result) => {
//        if (err) {
//            response.status(400).send('Error in database operation');
//        }
//        response.send('Got a DELETE request at /ratings');
//    });
// });

app.listen(80, function () {
    console.log('Node app is running on port 80');
});



