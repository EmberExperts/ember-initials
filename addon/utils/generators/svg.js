import Ember from 'ember';
import Base from './base';

export default class extends Base {
  revoke(url) {
    URL.revokeObjectURL(url);
  }

  generate(properties) {
    let textElement = this._generateTextElement(properties.initials, properties.initialsColor, properties.textStyles);
    let svgElement = this._generateSvgElement(properties.width, properties.height, properties.backgroundStyles);

    svgElement.append(textElement);
    let finalElement = Ember.$('<div>').append(svgElement);
    let blob = new Blob([finalElement.html()], { type: "image/svg+xml" });
    return URL.createObjectURL(blob);
  }

  // Private

  _generateTextElement(text, color, styles = {}) {
    return this._generateElement('<text></text>', styles, {
      y: '50%',
      x: '50%',
      dy: '0.35em',
      'text-anchor': 'middle',
      'pointer-events': 'auto',
      fill: color,
    }).html(text);
  }

  _generateElement(name, styles = {}, attrs = {}) {
    return Ember.$(name).attr(attrs).css(styles);
  }

  _generateSvgElement(width, height, styles = {}) {
    return this._generateElement('<svg></svg>', styles, {
      width,
      height,
      xmlns: 'http://www.w3.org/2000/svg',
      'pointer-events': 'none',
      'viewBox': '0 0 100 100'
    });
  }
}
