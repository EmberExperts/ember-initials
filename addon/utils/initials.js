export default function(name) {
  let initials = name ? name.trim() : '';
  let words = initials.split(' ');

  if (words.length > 1) {
    let first = capitalizedFirstLetter(words.shift());
    let last = capitalizedFirstLetter(words.pop());
    initials = first + last;
  } else if (words.length === 1) {
    initials = capitalizedFirstLetter(words.shift());
  }

  return initials;
}

// Private

function capitalizedFirstLetter(word) {
  return word ? word[0].toUpperCase() : '';
}
