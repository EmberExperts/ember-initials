export default function(name) {
  let initials = name ? name.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '').trim() : '';
  let letters = initials.split(' ');

  if (letters.length > 1) {
    let first = capitalizedFirstLetter(letters.shift());
    let last = capitalizedFirstLetter(letters.pop());
    initials = first + last;
  } else if (letters.length === 1) {
    initials = capitalizedFirstLetter(letters.shift());
  }

  return initials;
}

// Private

function capitalizedFirstLetter(word) {
  return word ? word[0].toUpperCase() : '';
}
