export function colorIndex(seedText, colorsLength) {
  let hashCode = HashCode(seedText);
  return Math.abs(Math.floor(hashCode % colorsLength));
};
