import sys
from collections import Counter

lines = sorted(open('input.txt').read().split("\n"))

minuteMap = [[] for i in range(60)]
minuteCounter = {}
maxMinute = 0

### build structure
for l in lines:
    s = l.split(' ')
    if 'Guard' in s:
        currentGuardId = s[3]
    if 'falls' in s:
        sleepMarker = int(s[1][3:5])
    if 'wakes' in s:
        awakeMarker = int(s[1][3:5])

        while sleepMarker < awakeMarker:
            (minuteMap[sleepMarker]).append(currentGuardId)
            minuteCounter[currentGuardId] = minuteCounter[currentGuardId] + 1 if minuteCounter.get(currentGuardId) else 1
            if minuteCounter[currentGuardId] > maxMinute:

                maxGid = currentGuardId
                maxMinute = minuteCounter[currentGuardId]
            sleepMarker += 1

i = 0
minuteMax = 0
minuteMaxIndex = 0
maxGuardSleepCount = 0
maxGuardSleepId = 0
maxGuardSleepIndex = 0
for m in minuteMap:
    minuteGuardCounter = len(filter(lambda x: x == maxGid, m))
    if minuteGuardCounter > minuteMax:
        minuteMaxIndex = i
        minuteMax = minuteGuardCounter
    if len(m) > 0:
        most_common,num_most_common = Counter(m).most_common(1)[0]

        if num_most_common > maxGuardSleepCount:
            maxGuardSleepId = most_common
            maxGuardSleepIndex = i
            maxGuardSleepCount = num_most_common

    i += 1


print(int(maxGid.replace('#', '')) * minuteMaxIndex)
print(int(maxGuardSleepId.replace('#', '')) * maxGuardSleepIndex)









