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

const EMOJI_RE = /\p{Emoji}/gu;

function capitalizedFirstLetter(word) {
  const trimmed = (word || '').replace(EMOJI_RE, '');
  return trimmed ? trimmed[0].toUpperCase() : '';
}
