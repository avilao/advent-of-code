arr = map(lambda x: int(x), open('input.txt').read().split(' '))

print(arr)



def nodeValue(a):
  childCount = a[0]
  metadataCount = a[1]
  print(sum(a[-metadataCount:]))


nodeValue(arr)


