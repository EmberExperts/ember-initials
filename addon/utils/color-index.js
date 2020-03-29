/* eslint-disable no-bitwise */
export default function(seedText, colorsLength) {
  const code = hashCode(seedText);

  return Math.abs(Math.floor(code % colorsLength));
}

// Private

function hashCode(string) {
  let hash = 0;

  if (string && string.length > 0) {
    for (let i = 0; i < string.length; i++) {
      const char = string.charCodeAt(i);

      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
  }

  return hash & hash;
}
