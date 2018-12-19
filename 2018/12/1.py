import math

rules = {}
ITERATIONS = 20
APPEND_STR_LEN = 4

inp = open('input.txt').read().split('\n')
vases = '.'*APPEND_STR_LEN + inp[0].replace('initial state: ', '') + '.'*APPEND_STR_LEN

for s in inp[2:]:
  r = s.split(' => ')
  rules[r[0]] = r[1]

print(len(rules))

for i in range(ITERATIONS):
  t = ['.' for x in range(len(vases) + APPEND_STR_LEN * 2)]
  for i in range(APPEND_STR_LEN, len(vases) - APPEND_STR_LEN + 1):
    t[i+APPEND_STR_LEN] = rules[vases[i-2:i+3]]  if rules.get(vases[i-2:i+3]) else '.'
  vases = ''.join(t)

n = 0
for i in range(len(vases)):
    n += i - ((ITERATIONS + 1) * APPEND_STR_LEN) if vases[i] == '#' else 0
print(n)
