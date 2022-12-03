export function solve(input) {
  const policies = input.split('\n');

  let validPasswordCount = 0;
  policies.forEach((policy) => {
    const [rule, charStr, password] = policy.split(' ');
    const [min, max] = rule.split('-');
    const c = charStr[0];

    let charCount = 0;
    for (let i = 0; i < password.length; i++) {
      if (password[i] === c) charCount++;
    }

    if (charCount >= min && charCount <= max) validPasswordCount++;
  });

  return validPasswordCount;
}

export function solve2(input) {
  const policies = input.split('\n');

  let validPasswordCount = 0;
  policies.forEach((policy) => {
    const [rule, charStr, password] = policy.split(' ');
    const [p1, p2] = rule.split('-').map((v) => parseInt(v, 10) - 1);
    const c = charStr[0];

    if (
      (password[p1] === c && password[p2] !== c) ||
      (password[p1] !== c && password[p2] === c)
    )
      validPasswordCount++;
  });

  return validPasswordCount;
}
