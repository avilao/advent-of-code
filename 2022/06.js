export function solve(input, markerLength = 1) {
  let regexStr = '([a-zA-Z])';
  for (let i = 0; i < markerLength - 1; i++) {
    regexStr += `(?!${Array.from(Array(i + 1), (_, i) => `\\${i + 1}`).join(
      '|'
    )})([a-zA-Z])`;
  }
  const regex = new RegExp(regexStr, 'g');
  return regex.exec(input).index + markerLength;
}
