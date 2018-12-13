def nodeValue(i):
  global a, s
  childCount = a[i]
  metadataCount = a[i+1]
  while childCount > 0:
    nodeValue(i+2)
    childCount -= 1
  s += sum(a[i + 2:i+metadataCount + 2])
  a = a[:i] + a[(i + metadataCount + 2):]

a = map(lambda x: int(x), open('input.txt').read().split(' '))
s = 0
nodeValue(0)
print(s)


