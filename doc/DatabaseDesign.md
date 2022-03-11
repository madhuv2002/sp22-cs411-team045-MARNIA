
# Database Design


## DDL Commands To Create Tables

1. Movie:
``` sql
CREATE TABLE Movie(
  MovieId INTEGER, 
  Title VARCHAR(50), 
  Year INTEGER, 
  AgeRating VARCHAR(10), 
  Score INTEGER, 
  PRIMARY KEY (MovieId)
);
```

2. User:
``` sql
CREATE TABLE User(
  UserId INTEGER, 
  Age INTEGER, 
  Password VARCHAR(40), 
  PRIMARY KEY (UserId)
);
```

3. StreamingPlatform:

``` sql 
CREATE TABLE StreamingPlatform(
  PlatformName VARCHAR(20), 
  PRIMARY KEY (PlatformName)
); 
```

4. MoviePlatformAssociation:
```sql
CREATE TABLE MoviePlatformAssociation(
  MovieId INTEGER, 
  PlatformName VARCHAR(20), 
  FOREIGN KEY (MovieId) 
  REFERENCES Movie(MovieId), 
  FOREIGN KEY (PlatformName) REFERENCES StreamingPlatform(PlatformName)
); 
```
5. MovieList
```sql
CREATE TABLE MovieList(
  ListId INTEGER, 
  PRIMARY KEY (ListId)
); 
```
6. MovieListMovieAssociation
```sql
CREATE TABLE MovieListMovieAssociation(
  MovieId INTEGER, 
  ListId INTEGER, 
  FOREIGN KEY (MovieId) 
  REFERENCES Movie(MovieId), 
  FOREIGN KEY (ListId) REFERENCES MovieList(ListId)
);
```
7. BlackList
```sql
CREATE TABLE BlackList(
  ListId INTEGER, 
  UserId INTEGER,  
  AvgRating REAL, 
  FOREIGN KEY (ListId) REFERENCES MovieList(ListId), 
  FOREIGN KEY (UserId) REFERENCES User(UserId), 
  PRIMARY KEY (ListId, UserId)
);
 ```

9. WhiteList
```sql
CREATE TABLE WatchList(
  ListId INTEGER, 
  UserId INTEGER, 
  TotalRuntime VARCHAR(20), 
  FOREIGN KEY (ListId) REFERENCES MovieList(ListId), 
  FOREIGN KEY (UserId) REFERENCES User(UserId), 
  PRIMARY KEY (ListId, UserId)
);
```
11. Rating
```sql
CREATE TABLE Rating(
  UserId INTEGER, 
  MovieId INTEGER, 
  DateTime VARCHAR(20), 
  Score INTEGER, 
  FOREIGN KEY (UserId) REFERENCES User(UserId), 
  FOREIGN KEY (MovieId) REFERENCES Movie(MovieId), 
  PRIMARY KEY (UserId, MovieId)
);
```
