import sys
from collections import Counter

line = open('input.txt').readline()

def bomb(str):
    l = len(str) - 1
    i = 0
    while i < l:
        if abs(ord(str[i]) - ord(str[i+1])) == 32:
            return bomb(str.replace(str[i:i+2], ''))
        i += 1

    return str

print(len(bomb(line)))
