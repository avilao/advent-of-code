import math

SERIAL = int(open('input.txt').read())
GRID_SIZE = 3

def energy(x, y):
  rackId = x + 10
  e = rackId * y
  e += SERIAL
  e *= rackId
  e = math.floor((e / 100) % 10)
  return int(e - 5)


m = [[ energy(x + 1, y + 1) for y in range(GRID_SIZE)] for x in range(GRID_SIZE)]

answer = [-5 * GRID_SIZE * GRID_SIZE, 0, 0, 0]

sat = [[ 0 for y in range(GRID_SIZE)] for x in range(GRID_SIZE)]

for y in range(GRID_SIZE):
  for x in range(GRID_SIZE):
      sat[x][y] = m[x][y] 
      if x > 0:
        sat[x][y] += sat[x-1][y]     
      if y > 0:
        sat[x][y] += sat[x][y-1]


for y in range(GRID_SIZE):
  for x in range(GRID_SIZE):
    for z in range(GRID_SIZE):
      if z+y < GRID_SIZE and x+z < GRID_SIZE:
        if z == 0:
          s = m[x][y]
        else: 
          s = sat[x][y] + sat[x+z][y+z] - sat[x][y+z] - sat[x+z][y]
        print(s, x, y, z)
        if s > answer[0]:
          answer = [s, x, y, z]

print(m)
print(sat)
print(answer)


      

# for y in range(GRID_SIZE):
#   print(y)
#   for x in range(GRID_SIZE):
#     SQR_SIZE = 1
#     while (SQR_SIZE + x) <= GRID_SIZE and (SQR_SIZE + y) < GRID_SIZE:
#       energySum = 0
#       for b in range(SQR_SIZE):
#         for a in range(SQR_SIZE):
#           energySum += m[a+x][b+y]
#       if energySum > answer[0]:
#           answer = [energySum, x, y, SQR_SIZE]
#       SQR_SIZE += 1

# print(answer)