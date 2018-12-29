def dec(n):
  return  list(int (i) for i in str(n))

start = 37
recipes = dec(start)
pos = [0, 1]
stop = int(open('input.txt').read())

while len(recipes) < stop + 10:
  n = recipes[pos[0]] + recipes[pos[1]]
  recipes += dec(n)
  pos = map(lambda p: (p + recipes[p] + 1) % len(recipes), pos )


print(''.join(str(i) for i in recipes[stop:stop+10]))