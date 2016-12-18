import Ember from 'ember';

function _generateElement(name, styles = {}, attrs = {}) {
  return Ember.$(name).attr(attrs).css(styles);
}

function generateTextElement(text, color, styles = {}) {
  return _generateElement('<text></text>', styles, {
    y: '50%',
    x: '50%',
    dy: '0.35em',
    'text-anchor': 'middle',
    'pointer-events': 'auto',
    fill: color,
  }).html(text);
}

function generateSvgElement(width, height, styles = {}) {
  return _generateElement('<svg></svg>', styles, {
    width,
    height,
    xmlns: 'http://www.w3.org/2000/svg',
    'pointer-events': 'none',
  });
}

function capitalizedFirstLetter(word) {
  return word ? word[0].toUpperCase() : '';
}

export function removeImage(url) {
  URL.revokeObjectURL(url);
}

export function generateImage(properties) {
  let textElement = generateTextElement(properties.initials, properties.initialsColor, properties.textStyles);
  let svgElement = generateSvgElement(properties.width, properties.height, properties.backgroundStyles);

  svgElement.append(textElement);
  let finalElement = Ember.$('<div>').append(svgElement);
  let blob = new Blob([finalElement.html()], { type: "image/svg+xml" });
  return URL.createObjectURL(blob);
}

export function generateInitials(name) {
  let initials = name ? name.trim() : '';
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
