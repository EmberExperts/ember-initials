export default class Svg {
  generate(properties) {
    const textElement = this._generateElement('text', properties.initials, {
      style: this._stringify(properties.textStyles, (key, value) => `${key}: ${value};`),
      y: '50%',
      x: '50%',
      dy: '0.35em',
      'text-anchor': 'middle',
      'pointer-events': 'none',
      fill: properties.initialsColor,
    });

    return this._generateElement('svg', textElement, {
      style: this._stringify(properties.backgroundStyles, (key, value) => `${key}: ${value};`),
      xmlns: 'http://www.w3.org/2000/svg',
      'pointer-events': 'none',
      'viewBox': '0 0 100 100'
    });
  }

  _generateElement(name, content, attrs = {}) {
    const attrsString = this._stringify(attrs, (key, value) => `${key}="${value}"`);

    return `<${name} ${attrsString}>${content}</${name}>`
  }

  _stringify(object = {}, transform = function() {}) {
    return Object.entries(object).map(([key, value]) => transform(key, value)).join(' ');
  }
}
