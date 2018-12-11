import math

SERIAL = int(open('input.txt').read())
GRID_SIZE = 300
SQR_SIZE = 3

def energy(x, y):
  rackId = x + 10
  e = rackId * y
  e += SERIAL
  e *= rackId
  e = math.floor((e / 100) % 10)
  return int(e - 5)


m = [[ energy(x + 1, y + 1) for y in range(GRID_SIZE)] for x in range(GRID_SIZE)]

answer = -5 * SQR_SIZE * SQR_SIZE
answerX, answerY = 0, 0
y = 0
while y < GRID_SIZE - SQR_SIZE:
  x = 0
  while x < GRID_SIZE - SQR_SIZE:
    s = 0
    b = 0
    while  b < SQR_SIZE:
      a = 0
      while a < SQR_SIZE:
        s += m[a+x][b+y]
        a += 1
      b += 1
    if s > answer:
        answer = s
        answerX = x
        answerY = y

    x += 1
  y += 1


print("%s, %s" % (answerX + 1, answerY + 1))