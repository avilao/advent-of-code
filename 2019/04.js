function isValid(n) {
  const a = ('' + n).split('').map((t) => parseInt(t));
  let adjacent = false;
  for (let i = 0; i < a.length - 1; i++) {
    if (a[i] > a[i + 1]) return false;
    if (a[i] === a[i + 1]) adjacent = true;
  }
  return adjacent;
}

function isValidAdjacentDigits(n) {
  const a = ('' + n).split('').map((t) => parseInt(t));
  let adjacent = false;
  for (let i = 0; i < a.length - 1; i++) {
    if (a[i] > a[i + 1]) return false;
    if (
      a[i] === a[i + 1] &&
      (i + 2 >= a.length || a[i + 2] !== a[i + 1]) &&
      (i < 0 || a[i - 1] !== a[i])
    )
      adjacent = true;
  }
  return adjacent;
}

function getValidPasswords(input, validatorFn) {
  const range = input.split('-').map((v) => parseInt(v));
  let valid = 0;

  for (let i = range[0]; i <= range[1]; i++) {
    valid += validatorFn(i) ? 1 : 0;
  }
  return valid;
}

export function getDifferentPasswordCount(input) {
  return getValidPasswords(input, isValid);
}

export function getDifferentPasswordStrictCount(input) {
  return getValidPasswords(input, isValidAdjacentDigits);
}
