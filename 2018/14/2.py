def dec(n):
  return  list(int (i) for i in str(n))

def findSubArray(sub, arr):
  for i in range(max([0, len(arr) - len(sub) * 2]) ,len(arr) - len(sub)):
    n = 0
    for j in range(len(sub)):
      if sub[j] != arr[j+i]:
        break
      n += 1
    if n == len(sub):
      return i
  return -1

start = 37
recipes = dec(start)
pos = [0, 1]
stop = map(lambda s: int(s), open('input.txt').read())

index = -1 
while index < 0:
  index = findSubArray(stop, recipes)
  n = recipes[pos[0]] + recipes[pos[1]]
  recipes += dec(n)
  pos = map(lambda p: (p + recipes[p] + 1) % len(recipes), pos)

print(index)
