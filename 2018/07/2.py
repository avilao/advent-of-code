def processPathInfo(s):
  ns = s.split(' ')
  return [ns[1], ns[7], False]

def findNextAvailableStart():
  for i, dep in enumerate(deps):
    if dep != False and dep[0] == False and len(dep[1]) == 0:
      return i
  return -1

def isFinished():
  for d in deps:
    if d != False:
      return False
  return True
  
paths = map(processPathInfo, open('input.txt').read().split("\n"))
deps = [False for x in range(26)]

for p in paths: # [boolWorkingInHere, list of deps]
  pStart = ord(p[0]) - 65
  pEnd = ord(p[1]) - 65

  if deps[pStart] == False:
    deps[pStart] = [False, []]
  if deps[pEnd] == False:
    deps[pEnd] = [False, []]
  deps[pEnd][1].append(pStart)

 
numWorkers = 5
workerLoad = [[0, -1] for x in range(numWorkers)] # [worked s, total sec]
final = ''
sec = 0

while not isFinished():
  for w in workerLoad:
    if w[1] == -1: # worker available
      i = findNextAvailableStart()
      if i >= 0: # available path, start working
        # print("sec %s, node %s" %(sec, i))
        w[0] = 0
        w[1] = i + 61
        deps[i][0] = True

  for w in workerLoad:
    if w[1] >= 0: # it's working
      w[0] += 1 # work on node
      if w[0] == w[1]: # finished working?
        final  += chr(w[1] + 4)

        # remove from all deps
        cleanIndex = w[1] - 61
        for d in deps:
          if d and cleanIndex in d[1]:
            d[1].remove(cleanIndex)
        deps[cleanIndex] = False
        w[1] = -1

  sec += 1

print(final)
print(sec)

