import Base from './base';

export default class extends Base {
  revoke(url) {
    URL.revokeObjectURL(url);
  }

  generate(properties) {
    let textElement = this._generateTextElement(properties.initials, properties.initialsColor, properties.textStyles);
    let svgElement = this._generateSvgElement(textElement, properties.width, properties.height, properties.backgroundStyles);
    let blob = new Blob([svgElement], { type: "image/svg+xml" });

    return URL.createObjectURL(blob);
  }

  // Private

  _generateTextElement(text, color, styles = {}) {
    return this._generateElement('text', text, styles, {
      y: '50%',
      x: '50%',
      dy: '0.35em',
      'text-anchor': 'middle',
      'pointer-events': 'auto',
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
    let attrsString = Object.keys(attrs).map((key) => {
      return `${key}="${attrs[key]}"`;
    }).join(' ');

    let stylesString = Object.keys(styles).map((key) => {
      return `${key}: ${styles[key]};`;
    }).join(' ');

    return `<${name} ${attrsString} style="${stylesString}">${content}</${name}>`
  }
}
