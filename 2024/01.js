export function solveOne(input) {
  const [listA, listB] = getOrderedListsFromInput(input);

  let sum = 0;
  for (let i = 0; i < listA.length; i++) {
    sum += Math.abs(listA[i] - listB[i]);
  }

  return sum;
}

export function solveTwo(input) {
  const [listA, listB] = getOrderedListsFromInput(input);

  let similarityScore = 0;

  // TODO: don't iterate list B for repeated elements of list B
  for (let i = 0; i < listA.length; i++) {
    let count = 0;
    const a = listA[i];

    for (let j = 0; j < listB.length; j++) {
      // avoid unnecessary iterations
      if (a < listB[j]) {
        break;
      }

      if (a === listB[j]) {
        count++;
      }
    }

    similarityScore += count * listA[i];
  }

  return similarityScore;
}

function getOrderedListsFromInput(input) {
  const lines = input.split('\n');
  const listA = [];
  const listB = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].split('  ');

    // TODO: should be inserting in order to avoid the final sorts
    listA.push(parseInt(line[0]));
    listB.push(parseInt(line[1]));
  }

  listA.sort();
  listB.sort();

  return [listA, listB];
}
