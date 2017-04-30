export function hashCode(string) {
  let hash = 0;

  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    let char = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
}

export function colorIndex(seedText, colorsLength) {
  let code = hashCode(seedText);
  return Math.abs(Math.floor(code % colorsLength));
}
