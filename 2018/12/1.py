import math

inp = open('input.txt').read().split('\n')
vases = '..' + inp[0].replace('initial state: ', '') + '..'
rules = {}
ITERATIONS = 20

for s in inp[2:]:
  r = s.split(' => ')
  rules[r[0]] = r[1]

for i in range(ITERATIONS):
  t = ['.' for x in range(len(vases) + 4)]
  for i in range(2, len(vases) - 2):
    t[i+2] = rules[vases[i-2:i+3]]  if rules.get(vases[i-2:i+3]) else '.'
  vases = ''.join(t)

n = 0
for i in range(len(vases)):
    n += i - ((ITERATIONS + 1) * 2) if vases[i] == '#' else 0
print(n)
print(vases)
