import pandas as pd
df = pd.read_csv("MoviesOnStreamingPlatforms.csv")
ret = ""
for i in range(len(df)):
    if df['Netflix'][i] == 1:
        ret += "INSERT INTO MoviePlatformAssociation VALUES(" + str(df['ID'][i]) + ", 'Netflix')\n"
        
    if df['Hulu'][i] == 1:
        ret += "INSERT INTO MoviePlatformAssociation VALUES(" + str(df['ID'][i]) + ", 'Hulu')\n"
    if df['Prime Video'][i] == 1:
        ret += "INSERT INTO MoviePlatformAssociation VALUES(" + str(df['ID'][i]) + ", 'Prime Video')\n"
    if df['Disney+'][i] == 1:
        ret += "INSERT INTO MoviePlatformAssociation VALUES(" + str(df['ID'][i]) + ", 'Disney+')\n"

f = open("association.sql", "w+")
f.write(ret)
f.close()
