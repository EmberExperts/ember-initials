import Ember from 'ember';
import HashCode from './-private/hash-code';
import {
  generateSvgElement,
  generateInitials,
  generateTextElement,
  generateImage,
} from './-private/generators';

export default Ember.Component.extend({
  tagName: 'img',
  attributeBindings: ['width', 'height', 'src'],

  defaultName: '?',
  defaultBackground: '#dd6a58',

  name: Ember.computed.reads('defaultName'),
  seedText: Ember.computed.reads('name'),

  size: 30,
  height: Ember.computed.reads('size'),
  width: Ember.computed.reads('size'),

  backgroundStyles: {},
  textStyles: {},

  textColor: 'white',
  fontSize: 12,
  fontWeight: 200,
  fontFamily: 'HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica, Arial,Lucida Grande, sans-serif',

  colors: [
    '#1abc9c', '#16a085', '#f1c40f',
    '#f39c12', '#2ecc71', '#27ae60',
    '#e67e22', '#d35400', '#3498db',
    '#2980b9', '#e74c3c', '#c0392b',
    '#9b59b6', '#8e44ad', '#bdc3c7',
    '#34495e', '#2c3e50', '#95a5a6',
    '#7f8c8d', '#ec87bf', '#d870ad',
    '#f69785', '#9ba37e', '#b49255',
    '#b49255', '#a94136', '#5461b4',
  ],

  initialsObserver: Ember.observer('name', 'seedText', function () {
    this.set('src', this.createInitials());
  }),

  initialsColor: Ember.computed('colors', 'seedText', 'defaultName', 'defaultBackground', function () {
    if (this.get('seedText') == this.get('defaultName')) {
      return this.get('defaultBackground');
    } else {
      let colorIndex = this._colorIndex(this.get('seedText'), this.get('colors.length'));
      return this.get('colors')[colorIndex];
    }
  }),

  src: Ember.computed('name', 'initialsColor', function () {
    return this.createInitials();
  }),

  createInitials() {
    let backgroundStyles = Object.assign(this._backgroundStyles(), this.get('backgroundStyles'));
    let svgElement = generateSvgElement(this.get('width'), this.get('height'), backgroundStyles);

    let initials = generateInitials(this.get('name'));
    let textStyles = Object.assign(this._textStyles(), this.get('textStyles'));
    let textElement = generateTextElement(initials, this.get('textColor'), textStyles);

    return generateImage(textElement, svgElement);
  },

  _colorIndex(seedText, colorsLength) {
    let hashCode = HashCode(seedText);
    return Math.abs(Math.floor(hashCode % colorsLength));
  },

  _textStyles() {
    return {
      'font-family': this.get('fontFamily'),
      'font-weight': this.get('fontWeight'),
      'font-size': this.get('fontSize') + 'px',
    };
  },

  _backgroundStyles() {
    return {
      'background-color': this.get('initialsColor'),
    };
  },
});
