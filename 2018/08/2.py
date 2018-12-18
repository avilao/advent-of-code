def nodeValue(i):
  global a
  childCount = a[i]
  metadataCount = a[i+1]
  childSums = []
  while childCount > 0:
    childSums.append(nodeValue(i+2))
    childCount -= 1
  
  metadata = a[i + 2:i+metadataCount + 2]
  a = a[:i] + a[(i + metadataCount + 2):]

  s = 0
  if len(childSums) == 0:
    s = sum(metadata)
  else:
    for m in metadata:
      if m - 1 < len(childSums):
        s += (childSums[m-1])  
  return s

a = map(lambda x: int(x), open('input.txt').read().split(' '))
print(nodeValue(0))
