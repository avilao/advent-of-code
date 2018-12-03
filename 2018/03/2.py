import sys

lines = map(lambda s: s.split(' '),  open('input.txt').read().split("\n"))

m = {}
overlapped = {}

for l in lines:
  n = l[0].replace('#', '')
  start = map(lambda x: int(x) - 1, l[2].replace(':', '').split(','))
  size = map(int, l[3].split('x'))
  y = 0
  while y < size[1]:
    x = 0
    while x < size[0]:
        c = "%s-%s" % (x + start[0], y + start[1])

        coord = m.get(c)
        if not coord: 
            m[c] = list()
        elif len(coord) == 1:
            overlapped[coord[0]] = True
            overlapped[n] = True
        else:
          overlapped[n] = True

        m[c].append(n)
        x += 1
    y += 1

for l in lines:
  n = l[0].replace('#', '')
  if not n in overlapped:
    print(n)
