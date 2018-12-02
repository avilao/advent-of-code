lines = map(lambda s: list(s),  open('input.txt').read().split("\n"))

nChars = len(lines[0])
nLines = len(lines)

i = 0

while i < nLines:
  j = i + 1

  while j < nLines:
    c = 0
    diff = 0
    while c < nChars:
      if lines[i][c] != lines[j][c]:
        diff += 1

      c += 1
        
    # found pair
    if diff == 1:
      c = 0
      answer = ''
      # find letters
      while c < nChars:
        if lines[i][c] == lines[j][c]:
          answer += lines[i][c]
        c += 1

      # end
      print(answer)
      j = nLines
      i = nLines

    j += 1
  i += 1
