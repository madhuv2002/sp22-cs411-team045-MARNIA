var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
const res = require('express/lib/response');
const req = require('express/lib/request');
const cors = require('cors');
const exp = require('constants');
const { response } = require('express');



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
app.use(express.urlencoded({extended:true}));
app.use(express.json());

setInterval(function(){
    var sql = `CALL ratingUpdate();`;
    console.log(sql)
    connection.query(sql, (err, result) => {
        if (err) {
            response.status(400).send('Error in database operation');
        }
        console.log('procedure finished');
    });
  }, 60*60*1000);
  
app.get('/', (request, response) => {
    response.send('Hello');
}
)

app.get('/movies', (request, response) => {
    var acclaimed = request.query.acclaimed;
    var userId = request.query.userId;
    if (acclaimed == 1) {
        var avgsql = "SELECT AVG(m.score) FROM Movie m";
    } 
    if (userId != null) {
        var sql = `SELECT m.MovieId, m.Title, m.Year, m.AgeRating, m.Score, ratings.RatingScore, rv.Review FROM Movie m Natural Join Review rv Left Join (SELECT r.MovieId, r.Score as RatingScore FROM Rating r WHERE r.UserId = ${userId}) as ratings on m.MovieId = ratings.MovieId`;
    } else {
        var sql = `SELECT * FROM Movie m `
    }

    
    
    var conditions = [];
    var subconditions = [];
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
        subconditions.push(`(m1.Title LIKE '${search}%')`)
    }
    if (age_rating != null) {
        conditions.push(`(m.AgeRating = '${age_rating}')`);
        subconditions.push(`(m1.AgeRating = '${age_rating}')`);
    }
    if (min_year != null && max_year != null) {
        conditions.push(`(m.Year >= ${min_year}) AND (m.Year <= ${max_year})`);
        subconditions.push(`(m1.Year >= ${min_year}) AND (m1.Year <= ${max_year})`);
    }
    if (netflix == 1) {
        conditions.push(`(EXISTS(SELECT * FROM MoviePlatformAssociation a WHERE a.MovieId = m.MovieId and a.PlatformName = 'Netflix'))`);
        subconditions.push(`(EXISTS(SELECT * FROM MoviePlatformAssociation a4 WHERE a4.MovieId = m1.MovieId and a4.PlatformName = 'Netflix'))`);
    }
    if (hulu == 1) {
        conditions.push(`(EXISTS(SELECT * FROM MoviePlatformAssociation a1 WHERE a1.MovieId = m.MovieId and a1.PlatformName = 'Hulu'))`);
        subconditions.push(`(EXISTS(SELECT * FROM MoviePlatformAssociation a5 WHERE a5.MovieId = m1.MovieId and a5.PlatformName = 'Hulu'))`);
    }
    if (disneyplus == 1) {
        conditions.push(`(EXISTS(SELECT * FROM MoviePlatformAssociation a2 WHERE a2.MovieId = m.MovieId and a2.PlatformName = 'Disney+'))`);
        subconditions.push(`(EXISTS(SELECT * FROM MoviePlatformAssociation a6 WHERE a6.MovieId = m1.MovieId and a6.PlatformName = 'Disney+'))`);
    }
    if (primevideo == 1) {
        conditions.push(`(EXISTS(SELECT * FROM MoviePlatformAssociation a3 WHERE a3.MovieId = m.MovieId and a3.PlatformName = 'Prime Video'))`);
        subconditions.push(`(EXISTS(SELECT * FROM MoviePlatformAssociation a7 WHERE a7.MovieId = m1.MovieId and a7.PlatformName = 'Prime Video'))`);
    }
    if (score != null) {
        conditions.push(`(m.Score >= ${score})`);
        subconditions.push(`(m1.Score >= ${score})`);
    }

    var where = ""

    for (let i = 0; i < conditions.length; i++) {
        if (i == 0) {
            avgsql += " WHERE ";
            sql += " WHERE ";

        }
        avgsql += conditions[i] + " ";
        sql += conditions[i] + " ";
        where += subconditions[i] + " ";
        if (i != conditions.length - 1) {
            avgsql += " AND ";
            sql += "AND ";
            where += " AND ";
        }
    }
    if (acclaimed == 1) {
        sql = `SELECT m.MovieId, m.Title, m.Year, m.AgeRating, m.Score, ratings.RatingScore, r2.Review FROM Movie m Natural Join Review r Left Join (SELECT r2.MovieId, r2.Score as RatingScore FROM Rating r2 WHERE r2.UserId = ${userId}) as ratings2 on m2.MovieId = ratings2.MovieId`;
        sql = "SELECT * FROM Movie m1 WHERE m1.Score > (" + avgsql + ")" + " AND " + where
        sql += " ORDER BY m1.Score desc"
    } else {
        sql += " ORDER BY m.Score desc"
    }


    
    
    console.log(sql);

    connection.query(sql, (err, result) => {
        if (err) {
            response.status(400).send('Error in database operation');
        }
       
        response.send(result);
    });
});

// app.get('/list', (request, response) => {
//     var blackList = request.query.blackList;
//     var listId = request.query.listId;
//     var sql;
//     if (listId == null) {
//         sql = `SELECT * FROM MovieList m`
//     } else {
//         if (blackList) {
//             sql = `SELECT * FROM BlackList b WHERE b.ListId = ${listId}`
//         } else {
//             sql = `SELECT * FROM WatchList w WHERE w.ListId = ${listId}`
//         }
//     }
    
//     connection.query(sql, (err, result) => {
//         if (err) {
//             response.status(400).send('Error in database operation');
//         }
//         response.send(result);
//     });
// });
// app.post('/list', (request, response) => {
//     var blackList = request.body.blackList;
//     var listId = request.body.listId;
//     var userId = request.body.UserId;
//     var sql;
//     if (blackList) {
//         sql = `INSERT IGNORE INTO MovieList(ListId) VALUES (${listId}); INSERT IGNORE INTO BlackList(ListId, UserId) VALUES (${listId}, ${userId})`;
//     } else {
//         sql = `INSERT IGNORE INTO MovieList(ListId) VALUES (${listId}); INSERT IGNORE INTO WatchList(ListId, UserId) VALUES (${listId}, ${userId})`;
//     }
//     console.log(sql);
//     connection.query(sql, (err, result) => {
//         if (err) {
//             response.status(400).send('Error in database operation');
//         }
//         console.log('record inserted');
//         res.redirect('/');
    
//     });

// });


app.get('/listmovie', (request, response) => {
    var listId = request.query.listId;
    console.log(listId);
    if (listId == null) {
        var sql = `SELECT DISTINCT * FROM MovieListMovieAssociation a`;
    } else {
        var sql = `SELECT DISTINCT m.Title FROM Movie m Join MovieListMovieAssociation a on  m.MovieId = a.MovieId WHERE a.ListId = ${listId}`;
    }
    console.log(sql);
    connection.query(sql, (err, result) => {
        if (err) {
            response.status(400).send('Error in database operation');
        }
        console.log(result);
        response.send(result);
    });
});
app.post('/listmovie', (request, response) => {
    var listId = request.body.listId;
    var movieId = request.body.movieId;
    var sql = `INSERT IGNORE INTO MovieListMovieAssociation(MovieId, ListId) VALUES (${movieId}, ${listId})`;
    console.log(sql);
    connection.query(sql, (err, result) => {
        if (err) {
            response.status(400).send('Error in database operation');
        }
        console.log('record inserted');
    });
});
app.delete('/listmovie', (request, response) => {
    var listId = request.body.listId;
    var movieId = request.body.movieId;
    var sql = `DELETE FROM MovieListMovieAssociation a WHERE a.ListId = ${listId} AND a.MovieId = ${movieId}`;
    console.log(sql);
    connection.query(sql, (err, result) => {
        if (err) {
            response.status(400).send('Error in database operation');
        }
        console.log('record deleted');
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

app.get('/ratings', (request, response) => {
	var userId = request.query.userId;
	
    if (userId == null) {
        var sql = `SELECT * FROM Rating r`;
    } else {
        var sql = `SELECT * FROM Rating r WHERE r.UserId = ${userId}`;
    }   
    console.log(sql)
	
    connection.query(sql, (err, result) => {
        if (err) {
            response.status(400).send('Error in database operation');
        }
        response.send(result);
    });
});

app.post('/ratings', (request, response) => {
    var userId = request.body.userId;
	var movieId = request.body.movieId;
    //var dateTime = request.body.dateTime;
    var ratingScore = request.body.ratingScore;
	
	var sql = `INSERT INTO Rating(UserId, MovieId, DateTime, Score) VALUES (${userId}, ${movieId}, NULL, ${ratingScore}) 
                ON DUPLICATE KEY UPDATE Score = VALUES (Score)`;

    console.log(sql)
    connection.query(sql, (err, result) => {
        if (err) {
            response.status(400).send('Error in database operation');
        }
        console.log('record inserted');
    });
});

app.delete('/ratings', (request, response) => {
   var movieId = request.body.movieId;
   var userId = request.body.userId;
   var sql = `DELETE FROM Rating r WHERE r.UserId = ${userId} AND r.MovieId = ${movieId}`;
   connection.query(sql, (err, result) => {
       if (err) {
           response.status(400).send('Error in database operation');
       }
       response.send('Got a DELETE request at /ratings');
   });
});


app.post('/users', (request, response) => {
    var userId = request.body.userId;
	var password = request.body.password;
    var username = request.body.username;
    var age = request.body.age;

	
	var sql = `INSERT INTO User(UserId, Password, Age, Username) VALUES ( ${userId}, "${password}", ${age}, "${username}")`;
    console.log(sql)
    connection.query(sql, (err, result) => {
        if (err) {
            response.status(400).send('Error in database operation');
        }
        console.log('record inserted');
    });
});
app.get('/users', (request, response) => {
    
    var userName = request.query.username;
    var password = request.query.password;
    var sql = `SELECT u.UserId, w.ListId as WatchListId, b.ListId as BlackListId FROM User u Join WatchList w ON u.UserId = w.UserId JOIN BlackList b ON u.UserId = b.UserId WHERE u.userName = "${userName}" AND u.password = MD5("${password}");`
    console.log(sql)
    connection.query(sql, (err, result) => {
        if (err) {
            response.status(400).send('Error in database operation');
        }
        console.log(result);
        response.send(result);
    });
})
app.post('/reviews', (request, response) => {
    var sql = `CALL ratingUpdate();`;
    console.log(sql)
    connection.query(sql, (err, result) => {
        if (err) {
            response.status(400).send('Error in database operation');
        }
        console.log('procedure finished');
    });
})
app.listen(80, function() {
  console.log("Node app is running on port 80")
});