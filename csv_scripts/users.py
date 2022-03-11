import random
import string

def dup_apostrophes(s):
    ret = ""
    for i in range(len(s)):
        ret += s[i]
        if s[i] == '\'':
            ret += '\''
    return ret

ret = ""
letters = string.ascii_lowercase + string.ascii_uppercase + string.digits + string.punctuation
for i in range(2000):
    ret += "INSERT INTO User VALUES("
    ret += str(i) + ","
    ret += str(random.randint(10, 90)) + ","
    password = ''.join(random.choice(letters) for i in range(30))
    ret += "'" + dup_apostrophes(password) + "'"
    ret += ");\n"

f = open("users.sql", "w+")
f.write(ret)
f.close()

