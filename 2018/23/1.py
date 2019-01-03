import sys,re

bots = [map(int, re.findall("-?\d+", line)) for line in open('input.txt').read().split('\n')]

maxBot = [0,0,0,0] 
for b in iter(bots):
  maxBot = b if b[3] > maxBot[3] else maxBot

botsInDistance = 0
for b in iter(bots):
  md = abs(maxBot[0] - b[0]) +  abs(maxBot[1] - b[1]) +  abs(maxBot[2] - b[2])
  botsInDistance += 1 if md <= maxBot[3] else 0

print(botsInDistance)
