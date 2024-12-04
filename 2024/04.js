// PART TWO
export function solveTwo(input, targetStr) {
  const matrix = input.split('\n');

  if (!(targetStr.length % 2)) {
    return -1;
  }

  let midIndex = Math.floor(targetStr.length / 2);

  let count = 0;
  for (let y = 1; y < matrix.length - 1; y++) {
    for (let x = 1; x < matrix[y].length - 1; x++) {
      let isCrossValid = true;
      for (let o = 0; o <= midIndex; o++) {
        if (
          !(
            ((matrix[y + o][x + o] === targetStr[midIndex - o] &&
              matrix[y - o][x - o] === targetStr[midIndex + o]) ||
              (matrix[y + o][x + o] === targetStr[midIndex + o] &&
                matrix[y - o][x - o] === targetStr[midIndex - o])) &&
            ((matrix[y + o][x - o] === targetStr[midIndex - o] &&
              matrix[y - o][x + o] === targetStr[midIndex + o]) ||
              (matrix[y + o][x - o] === targetStr[midIndex + o] &&
                matrix[y - o][x + o] === targetStr[midIndex - o]))
          )
        ) {
          isCrossValid = false;
          break;
        }
      }
      if (isCrossValid) count++;
    }
  }
  return count;
}

// Non working approach trying to create the possible patterns and iterate the matrix do compare them
//
// export function solveTwo(input, targetStr) {
//   const matrix = parseInput(input);
//   const permutations = getPermutations(targetStr);

//   let count = offset -1;
//   for (let y = 0; y < matrix.length - targetStr.length; y++) {
//     for (let x = 0; x < matrix[y].length - targetStr.length; x++) {
//       let matchCount = 0;
//       permutations.forEach((permutation) => {
//         let isEqual = true;
//         for (let i = 0; i < permutation.length; i++) {
//           for (let j = 0; j < permutation[i].length; j++) {
//             const permutationChar = permutation[i][j];
//             if (
//               permutationChar !== ' ' &&
//               matrix[y + i][x + j] !== permutationChar
//             ) {
//               isEqual = false;
//               break;
//             }
//           }
//         }
//         matchCount += isEqual ? 1 : 0;
//       });

//       if (matchCount > 1) {
//         count += matchCount - 1;
//       }

//       // console.log(matchCount, count);
//     }
//   }
//   return count;
// }

// function getPermutations(str) {
//   // TODO: based on input
//   const permutations = [];
//   permutations.push(['S  ', ' A ', '  M']);
//   permutations.push(['M  ', ' A ', '  S']);
//   permutations.push(['  M', ' A ', 'S  ']);
//   permutations.push(['  S', ' A ', 'M  ']);

//   return permutations;
// }

// PART ONE
const DIRECTIONS = {
  E: [1, 0],
  N: [0, -1],
  NE: [1, -1],
  NW: [-1, -1],
  S: [0, 1],
  SE: [1, 1],
  SW: [-1, 1],
  W: [-1, 0],
};

export function solve(input, targetStr) {
  const matrix = input.split('\n');

  let count = 0;
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      Object.values(DIRECTIONS).forEach((dir) => {
        if (matrix[y][x] === targetStr[0]) {
          count += findTargetStr(
            x + dir[0],
            y + dir[1],
            dir,
            1,
            matrix,
            targetStr
          );
        }
      });
    }
  }
  return count;
}

function findTargetStr(x, y, direction, currentChar, matrix, targetStr) {
  // out of bounds
  if (y < 0 || y >= matrix.length || x < 0 || x >= matrix[y].length) {
    return 0;
  }

  if (matrix[y][x] === targetStr[currentChar]) {
    if (currentChar === targetStr.length - 1) {
      return 1;
    } else {
      return findTargetStr(
        x + direction[0],
        y + direction[1],
        direction,
        currentChar + 1,
        matrix,
        targetStr
      );
    }
  }

  return 0;
}
