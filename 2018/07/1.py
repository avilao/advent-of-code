def processPathInfo(s):
  ns = s.split(' ')
  return [ns[1], ns[7]]

def findNextStart():
  for i, pathStart in enumerate(paths):
    found = False
    for pathEnd in paths:
      if pathStart[0] == pathEnd[1]:
        found = True
        break
    if not found:
      return i

def clearUselessPaths():
  i = 0
  while i < len(paths):
    if marked.get(paths[i][0]) and marked.get(paths[i][1]):
      del paths[i]
    else:
      i += 1
  return

def markPath(c):
  if not marked.get(c):
    marked[c] = True
    return c
  return ''
  
paths =  sorted(map(processPathInfo, open('input.txt').read().split("\n")))

final = ''

marked = {}
while len(paths) > 0:
  i = findNextStart()
  final += markPath(paths[i][0])
  if len(paths) == 1:
    final += markPath(paths[i][1])
  del paths[i]
  clearUselessPaths()

print(final)
