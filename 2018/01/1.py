import sys

sum = 0
with open('input.txt') as fp:  
  line = fp.readline()
  while line:
    sum += int(line)
    line = fp.readline()

print(sum)
