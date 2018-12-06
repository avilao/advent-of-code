lines = sorted(map(lambda x: map(lambda x: int(x), x.split(',')), open('input.txt').read().split("\n")))

print(lines)

mX = 0
mY = 0

for c in lines:
  if c[0] > mX:
    mX = c[0]
  if c[1] > mY:
    mY = c[1]

m = [[ [] for x in range(mX)] for y in range(mY)] 
j = 0
while j < mY:
  i = 0
  while i < mX:
    count = 0
    for c in lines:
      d = abs(i - c[0]) + abs(j - c[1])
      l = len(m[j][i])
      if l > 0:
        print(m[j][i])
      if l == 0:
          m[j][i].append([chr(count+65), d])
      elif l > 0 and m[j][i][1] < d:
        m[j][i] = [].append([chr(count+65), d])
      else:
        m[j][i].append([chr(count+65), d])
      count += 1
    i += 1
  j += 1

print(m)

