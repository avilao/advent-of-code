import sys

lines = map(lambda x: long(x),  open('input.txt').read().split("\n"))

sum = 0
map = {}
i = 0
l = len(lines)

while True:
  sum += lines[i % l]

  if map.get(sum): 
    break
  
  map[sum] = True
  i += 1

print(sum)
