import sys

lines = map(lambda x: map(lambda x: int(x), x.split(',')), open('input.txt').read().split("\n"))


nLines = len(lines)
xMax = 0
yMax = 0
for c in lines:
  if c[0] > xMax:
    xMax = c[0]
  if c[1] > yMax:
    yMax = c[1]

yMax += 1
xMax += 1
m = [[ [] for x in range(xMax)] for y in range(yMax)]
j = 0
while j < yMax:
  i = 0
  while i < xMax:
    c = 0
    while c < nLines:
      d = abs(i - lines[c][0]) + abs(j - lines[c][1])
      curr = m[j][i]
      l = len(curr)
      if l == 0 or (l > 0 and m[j][i][0][1] == d):
          m[j][i].append([c, d])
      elif l > 0 and d < m[j][i][0][1]:
        m[j][i] = [[c, d]]
      c += 1
    i += 1
  j += 1


j = 0
finites = []
final = [0 for x in range(nLines)]

while j < yMax:
  i = 0
  while i < xMax:
    if len(m[j][i]) != 1:
      c = '.'
    else:
      c = m[j][i][0][0]
      final[c] += 1

      if i == 0 or j == 0 or i == (xMax - 1) or j == (yMax - 1):
        if not c in finites:
          finites.append(m[j][i][0][0])
      
      if c in finites:
        final[c] = 0

    i += 1
  j += 1

print(sorted(final)[len(final) -1])
