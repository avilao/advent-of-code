lines = map(lambda x: map(lambda x: int(x), x.split(',')), open('input.txt').read().split("\n"))

treshold = 10000
xMax = 0
yMax = 0
for c in lines:
  if c[0] > xMax:
    xMax = c[0]
  if c[1] > yMax:
    yMax = c[1]

yMax += 1
xMax += 1
final = 0
j = 0
while j < yMax:
  i = 0
  while i < xMax:
    d = 0
    for c in lines:
      d += abs(i - c[0]) + abs(j - c[1])
      if d >= treshold:
        break
    if d < treshold:
      final += 1
    i += 1
  j += 1

print(final)
