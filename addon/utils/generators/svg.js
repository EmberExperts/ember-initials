export default class Svg {
  generate(properties) {
    let textElement = this._generateTextElement(properties.initials, properties.initialsColor, properties.textStyles);
    return this._generateSvgElement(textElement, properties.width, properties.height, properties.backgroundStyles);
  }

  // Private

  _generateTextElement(text, color, styles = {}) {
    return this._generateElement('text', text, styles, {
      y: '50%',
      x: '50%',
      dy: '0.35em',
      'text-anchor': 'middle',
      'pointer-events': 'none',
      fill: color,
    });
  }

  _generateSvgElement(text, width, height, styles = {}) {
    return this._generateElement('svg', text, styles, {
      width,
      height,
      xmlns: 'http://www.w3.org/2000/svg',
      'pointer-events': 'none',
      'viewBox': '0 0 100 100'
    });
  }

  _generateElement(name, content = '', styles = {}, attrs = {}) {
    let attrsString = this._transformObject(attrs, (key) => `${key}="${attrs[key]}"`)
    let stylesString = this._transformObject(styles, (key) => `${key}: ${styles[key]};`)

    return `<${name} ${attrsString} style="${stylesString}">${content}</${name}>`
  }

  _transformObject(object, transform = function() {}) {
    return Object.keys(object).map((key) => transform(key)).join(' ');
  }
}
