function buildMaps(input) {
  const lines = input.split('\n');

  const xMax = lines[0].length;
  const yMax = lines.length;

  // build tree map
  const treeMap = new Array(xMax).fill().map(() => Array(yMax));
  lines.forEach((line, y) => {
    line.split('').forEach((tree, x) => {
      treeMap[x][y] = tree;
    });
  });

  const visibilityMap = new Array(xMax).fill().map(() => Array(yMax).fill(0));

  return { treeMap, visibilityMap, xMax, yMax };
}

export function getVisibleTreesFromBestTree(input) {
  const { treeMap, visibilityMap, xMax, yMax } = buildMaps(input);

  for (let x = 0; x < xMax; x++) {
    for (let y = 0; y < yMax; y++) {
      let visibleToNorth = 0,
        visibleToSouth = 0,
        visibleToEast = 0,
        visibleToWest = 0;
      // Count visible to west
      for (let i = x - 1; i >= 0; i--) {
        visibleToWest++;
        if (treeMap[i][y] >= treeMap[x][y]) break;
      }

      // Count visible to the east
      for (let i = x + 1; i < xMax; i++) {
        visibleToEast++;
        if (treeMap[i][y] >= treeMap[x][y]) break;
      }

      // Count visible to the south
      for (let j = y + 1; j < yMax; j++) {
        visibleToSouth++;
        if (treeMap[x][j] >= treeMap[x][y]) break;
      }

      // Count visible to the north
      for (let j = y - 1; j >= 0; j--) {
        visibleToNorth++;
        if (treeMap[x][j] >= treeMap[x][y]) break;
      }
      visibilityMap[x][y] =
        visibleToNorth * visibleToSouth * visibleToEast * visibleToWest;
    }
  }

  // find max value
  let max = 0;
  for (let x = 0; x < xMax; x++) {
    for (let y = 0; y < yMax; y++) {
      if (visibilityMap[x][y] > max) max = visibilityMap[x][y];
    }
  }
  return max;
}

export function getVisibleTreesFromOutside(input) {
  const { treeMap, visibilityMap, xMax, yMax } = buildMaps(input);
  // visible from west
  for (let x = 0; x < xMax; x++) {
    for (let y = 0, max = -1; y < yMax; y++) {
      if (treeMap[x][y] > max) {
        visibilityMap[x][y] = true;
        max = treeMap[x][y];
      }
    }
  }

  // visible from east
  for (let x = xMax - 1; x >= 0; x--) {
    for (let y = yMax - 1, max = -1; y >= 0; y--) {
      if (treeMap[x][y] > max) {
        visibilityMap[x][y] = true;
        max = treeMap[x][y];
      }
    }
  }

  // visible from south
  for (let y = 0; y < yMax; y++) {
    for (let x = 0, max = -1; x < xMax; x++) {
      if (treeMap[x][y] > max) {
        visibilityMap[x][y] = true;
        max = treeMap[x][y];
      }
    }
  }

  // visible from north
  for (let y = yMax - 1; y >= 0; y--) {
    for (let x = xMax - 1, max = -1; x >= 0; x--) {
      if (treeMap[x][y] > max) {
        visibilityMap[x][y] = true;
        max = treeMap[x][y];
      }
    }
  }

  let countOfVisibleTrees = 0;
  for (let x = 0; x < xMax; x++) {
    for (let y = 0; y < yMax; y++) {
      if (visibilityMap[x][y]) countOfVisibleTrees++;
    }
  }
  return countOfVisibleTrees;
}
