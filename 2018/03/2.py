import sys

lines = map(lambda s: s.split(' '),  open('input.txt').read().split("\n"))

m = {}

for l in lines:
  n = l[0].replace('#', '')
  start = map(lambda x: int(x) - 1, l[2].replace(':', '').split(','))
  size = map(int, l[3].split('x'))
  y = 0
  while y < size[1]:
    x = 0
    while x < size[0]:
        c = "%s-%s" % (x + start[0], y + start[1])
        if not m.get(c): 
            m[c] = list()
        
        m[c].append(n)
        x += 1
    y += 1


repeated = {k: v for k, v in m.items() if len(v) > 1}

for l in lines:
  n = l[0].replace('#', '')
  found = False
  for k, v in repeated.items():    
    if n in v:
      found = True
      break

  if not found:
    print(n)
