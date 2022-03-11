import pandas as pd

def dup_apostrophes(s):
    ret = ""
    for i in range(len(s)):
        ret += s[i]
        if s[i] == '\'':
            ret += '\''
    return ret
            



df = pd.read_csv("MoviesOnStreamingPlatforms.csv")
ret = ""
for i in range(len(df)):
    ret += "INSERT INTO Movie VALUES(" + str(df["ID"][i]) + "," 
    ret += "'" + dup_apostrophes(df["Title"][i]) + "',"
    ret += str(df["Year"][i]) + ","
    if pd.isna(df["Age"][i]):
        ret += "NULL,"
    else:
        ret += "'" + str(df["Age"][i]) + "',"
    if pd.isna(df["Rotten Tomatoes"][i]):
        ret += "NULL"
    else:
        ret += str(df["Rotten Tomatoes"][i][0:2])
    ret += ");\n"
f = open("movies.sql", "w+")
f.write(ret)
f.close()
