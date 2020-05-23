export default function(name) {
  let initials = name ? name.trim() : '';
  const words = initials.split(' ');

  if (words.length > 1) {
    const first = capitalizedFirstLetter(words.shift());
    const last = capitalizedFirstLetter(words.pop());

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
