import ImageAvatarComponent from '../image';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { reads } from '@ember/object/computed';
import { assign } from '@ember/polyfills';

import initialsFor from 'ember-initials/utils/initials';
import Store from 'ember-initials/utils/store';
import ColorIndex from 'ember-initials/utils/color-index';

const cache = new Store();

const defaultColors = [
  '#1abc9c', '#16a085', '#f1c40f',
  '#f39c12', '#2ecc71', '#27ae60',
  '#e67e22', '#d35400', '#3498db',
  '#2980b9', '#e74c3c', '#c0392b',
  '#9b59b6', '#8e44ad', '#bdc3c7',
  '#34495e', '#2c3e50', '#95a5a6',
  '#7f8c8d', '#ec87bf', '#d870ad',
  '#f69785', '#9ba37e', '#b49255',
  '#b49255', '#a94136', '#5461b4',
];

class InitialsAvatarComponent extends ImageAvatarComponent {
  @tracked defaultBackground = '#dd6a58';
  @tracked fontSize = 50;
  @tracked fontWeight = 'Helvetica Neue Light, Arial, sans-serif';
  @tracked fontFamily = 200;
  @tracked textColor = 'white';
  @tracked defaultName = '?';
  @tracked colors = defaultColors;

  @reads('defaultName') name;
  @reads('name') alt;
  @reads('name') title;
  @reads('name') seedText;

  @tracked _initials;
  @tracked _textStyles;
  @tracked _backgroundStyles;
  @tracked _backgroundColor;

  get src() {
    return this._src || this.image || this._initialsSrc();
  }

  set src(value) {
    return this._src = value;
  }

  get initials() {
    return this._initials || initialsFor(this.name || this.defaultName);
  }

  set initials(value) {
    return this._initials = value;
  }

  get defaultTextStyles() {
    return {
      'font-family': this.fontFamily,
      'font-weight': this.fontWeight,
      'font-size': `${this.fontSize}px`,
    };
  }

  get defaultBackgroundStyles() {
    return {
      'user-select': 'none',
      'vertical-align': 'middle',
      'background-color': this.backgroundColor,
    };
  }

  get backgroundStyles() {
    return this._backgroundStyles || this.defaultBackgroundStyles;
  }

  set backgroundStyles(value) {
    return this._backgroundStyles = assign({}, this.defaultBackgroundStyles, value);
  }

  get textStyles() {
    return this._textStyles || this.defaultTextStyles;
  }

  set textStyles(value) {
    return this._textStyles = assign({}, this.defaultTextStyles, value);
  }

  get backgroundColor() {
    if (this._backgroundColor) return this._backgroundColor;

    let { colors, seedText, defaultName, defaultBackground } = this;

    if (seedText === defaultName) {
      return defaultBackground;
    } else {
      let index = ColorIndex(seedText, colors.length);
      return colors[index];
    }
  }

  set backgroundColor(value) {
    return this._backgroundColor = value;
  }

  @action
  onError(e) {
    e.srcElement.src = this._initialsSrc();
  }

  _initialsSrc() {
    const properties = {
      initials: this.initials,
      initialsColor: this.textColor,
      textStyles: this.textStyles,
      backgroundStyles: this.backgroundStyles,
    };

    return cache.getItem(properties);
  }
}

export default InitialsAvatarComponent;
