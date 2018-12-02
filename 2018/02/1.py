import sys

c2 = 0
c3 = 0

with open('input.txt') as fp:  
  line = fp.readline()
  while line:
    m = {}
    f2 = False
    f3 = False

    for c in line:
      m[c] = m[c] + 1 if m.get(c) else 1

    for k, v in m.items():
      if v == 2 and not f2:
        f2 = True
        c2 += 1
      
      if v == 3 and not f3:
        f3 = True
        c3 += 1

      if f2 and f3:
        break
    
    line = fp.readline()

  print(c2 * c3)
