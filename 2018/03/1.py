import sys

lines = map(lambda s: s.split(' '),  open('input.txt').read().split("\n"))

m = {}

for l in lines:
  start = map(lambda x: int(x) - 1, l[2].replace(':', '').split(','))
  size = map(int, l[3].split('x'))

  y = 0
  while y < size[1]:
    x = 0
    while x < size[0]:
        c = "%s-%s" % (x + start[0], y + start[1])
        m[c] = m[c] + 1 if m.get(c) else 1
        x += 1
    y += 1

d = {k: v for k, v in m.items() if v > 1}
print(len(d))