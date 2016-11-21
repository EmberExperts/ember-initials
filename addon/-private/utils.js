function hashCode(string) {
  let hash = 0;

  if (string.length > 0) {
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  }

  return hash & hash;
}

export function colorIndex(seedText, colorsLength) {
  let code = hashCode(seedText);
  return Math.abs(Math.floor(code % colorsLength));
}
