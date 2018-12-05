import sys

line = open('input.txt').readline()

def bomb(s):
    found = True
    while found: 
        i = 0
        found = False
        while i < len(s) - 1:
            if abs(ord(s[i]) - ord(s[i+1])) == 32:

                s = s[:i] + s[i+2:]
                found = True
            else:
                i += 1
    return s
        
j = 65 
m = float('inf')
while j <= 90: #char Z
    l = len(bomb(line.replace(chr(j), '').replace(chr(j+32), '')))
    if l < m:
        m = l
    j += 1

print(m)










