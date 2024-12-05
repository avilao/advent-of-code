// PART ONE

import { getIntersections } from '../utils/arrays';

export function solve(input) {
  const [updateOrders, orderRules] = parseInput(input);

  let sum = 0;

  updateOrders.forEach((update) => {
    let isValid = true;
    for (let i = 0; i < update.length; i++) {
      const page = update[i];
      const rules = orderRules[page] || [];
      const checkedElements = update.slice(0, i);

      if (getIntersections(rules, checkedElements).length) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      sum += parseInt(update[parseInt(update.length / 2)]);
    }
  });
  return sum;
}

export function solveTwo(input) {
  const [updateOrders, orderRules] = parseInput(input);

  let sum = 0;

  updateOrders.forEach((update) => {
    let isValid = true;
    for (let i = 0; i < update.length; i++) {
      const page = update[i];
      const rules = orderRules[page] || [];
      const checkedElements = update.slice(0, i);

      const brokenRules = getIntersections(rules, checkedElements);
      if (brokenRules.length) {
        isValid = false;
        const indexToMove = findMinimumBrokenIndex(update, brokenRules);

        update.splice(i, 1);
        update.splice(indexToMove, 0, page);
      }
    }

    if (!isValid) {
      sum += parseInt(update[parseInt(update.length / 2)]);
    }
  });
  return sum;
}

function findMinimumBrokenIndex(update, brokenRules) {
  for (let i = 0; i < update.length; i++) {
    if (brokenRules.includes(update[i])) {
      return i;
    }
  }
  return -1;
}

function parseInput(input) {
  const orderRules = {};
  const updateOrders = [];

  const lines = input.split('\n');

  let i = 0;
  for (; i < lines.length; i++) {
    const line = lines[i];
    if (line === '') break;

    const [page, rule] = line.split('|');
    (orderRules[page] ||= []).push(rule);
  }

  for (i++; i < lines.length; i++) {
    updateOrders.push(lines[i].split(','));
  }
  return [updateOrders, orderRules];
}
