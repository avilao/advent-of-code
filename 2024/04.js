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

export function solveTwo(input) {
  const matrix = parseInput(input);
  // const permutations = getPermutations(targetStr);

  let count = 0;
  for (let y = 1; y < matrix.length - 1; y++) {
    for (let x = 1; x < matrix[y].length - 1; x++) {
      if (matrix[y][x] === 'A') {
        if (
          ((matrix[y + 1][x + 1] === 'M' && matrix[y - 1][x - 1] === 'S') ||
            (matrix[y + 1][x + 1] === 'S' && matrix[y - 1][x - 1] === 'M')) &&
          ((matrix[y + 1][x - 1] === 'M' && matrix[y - 1][x + 1] === 'S') ||
            (matrix[y + 1][x - 1] === 'S' && matrix[y - 1][x + 1] === 'M'))
        ) {
          count++;
        }
      }
    }
  }

  return count;
}

// Non working approach trying to create the possible patterns and iterate the matrix do compare them
//
// export function solveTwo(input, targetStr) {
//   const matrix = parseInput(input);
//   const permutations = getPermutations(targetStr);

//   let count = 0;
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

function parseInput(input) {
  let parsedInput = [];
  const lines = input.split('\n');

  lines.forEach((line) => {
    parsedInput.push(line);
  });

  return parsedInput;
}

export function solve(input, targetStr) {
  const matrix = parseInput(input);

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
