ITERATIONS = 20
inp = open('input.txt').read().split('\n')
starting_vases = '..' + inp[0].replace('initial state: ', '') + '..'

rules = dict( line.split()[::2] for line in inp[2:])

def grow(vases):
  result = '..'
  vases = '..' + vases + '..'
  for i in range(2, len(vases) - 2):
   result += rules[vases[i-2:i+3]]  if rules.get(vases[i-2:i+3]) else '.'
  return result + '..'

def vaseCount(vases, gen):
  s = 0
  PIVOT = (gen + 1) * 2
  for i in range(len(vases)):
    s += (i - PIVOT if vases[i] == '#' else 0)
  return s

vases = starting_vases
for g in range(ITERATIONS):
  vases = grow(vases)
print(vaseCount(vases, ITERATIONS))

vases = starting_vases
prevSum = currSum = 0
for i in range(1000):
    prevSum = currSum
    vases = grow(vases)
    currSum = vaseCount(vases, i + 1)
print(prevSum + (currSum - prevSum) * (50000000000 - i))
