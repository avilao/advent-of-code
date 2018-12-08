def processPathInfo(s):
  ns = s.split(' ')
  return [ns[1], ns[7], False]

def findNextAvailableStart(paths):
  for i, pathStart in enumerate(paths):
    found = False
    if pathStart[2]: #someone working on it
      continue
    for pathEnd in paths:
      if pathStart[0] == pathEnd[1]:
        found = True
        break
    if not found:
      return i
  return -1

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

numWorkers = 2
workerLoad = [[0, 0, -1] for x in range(numWorkers)] # [worked s, total sec, node index]

final = ''
marked = {}
sec = 0

while len(paths) > 1:
  while sec < 9000 :
    indexestoDelete = []
    for w in workerLoad:
      if w[1] == 0: # worker available
        i = findNextAvailableStart(paths)
        if i >= 0: # available path, start working
          w[0] = 0
          w[1] = ord(paths[i][0]) - 64 # target secs
          w[2] = i
          paths[i][2] = True

    for w in workerLoad:
      if w[1] >= 0: # it's working
        w[0] += 1 # work on node
        if w[0] == w[1]: # finished working? 
          final += markPath(paths[w[2]])
          w[1] = 0
          w[2] = -1




    clearUselessPaths()

    



print(final)
