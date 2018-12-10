import re
import sys  

coordinates =  map(lambda s:  map(int, re.findall(r'[-]?\d+', s)), open('input.txt').read().split("\n"))

found = False
n = 0
while not found:
  xMin = 99999999
  xMax = -9999999
  yMin = 99999999
  yMax = -9999999
  n += 1
  for c in coordinates:
    c[0] += c[2]
    c[1] += c[3]

    xMin = c[0] if c[0] < xMin else xMin
    xMax = c[0] if c[0] > xMax else xMax
    yMin = c[1] if c[1] < yMin else yMin
    yMax = c[1] if c[1] > yMax else yMax

  if yMax - yMin <= 10:
    found = True

y = yMin - 1
while y <= yMax + 1:
  x = xMin - 1
  while x <= xMax + 1:
    ch = '.'
    for c in coordinates:
      if c[0] == x and c[1] == y:
        ch = '#'
        break
    x += 1
    sys.stdout.write(ch)
  y += 1
  sys.stdout.write('\n')
print(n)
sys.stdout.flush()
