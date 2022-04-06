ret = ""
for i in range(1, 9517):
    ret += "INSERT INTO Rating(UserId, MovieId, DateTime, Score) VALUES (1, " + str(i) + ", NULL, 0) ON DUPLICATE KEY UPDATE Score = VALUES (Score);\n"
f = open("ratings.sql", "w+")
f.write(ret)
f.close()
