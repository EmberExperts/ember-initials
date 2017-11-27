import { assign } from '@ember/polyfills';
import { getOwner } from '@ember/application';
import { observer, computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';
import ColorIndex from '../utils/color-index';
import Initials from '../utils/initials';

export default Mixin.create({
  tagName: 'img',
  attributeBindings: ['width', 'height', 'src', 'onError'],

  initialsStore: service('ember-initials-store'),

  defaultName: '?',
  defaultBackground: '#dd6a58',

  image: null,
  name: reads('defaultName'),
  seedText: reads('name'),

  size: 30,
  height: reads('size'),
  width: reads('size'),

  backgroundStyles: {},
  textStyles: {},

  textColor: 'white',
  fontSize: 50,
  fontWeight: 200,
  fontFamily: 'Helvetica Neue Light, Arial, sans-serif',

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

  initialsObserver: observer('name', 'seedText', 'fontSize', 'fontWeight', 'fontFamily', 'textColor', 'defaultName', function () {
    this.notifyPropertyChange('src');
  }),

  backgroundColor: computed('colors.length', 'seedText', 'defaultName', 'defaultBackground', function () {
    if (this.get('seedText') === this.get('defaultName')) {
      return this.get('defaultBackground');
    } else {
      let index = ColorIndex(this.get('seedText'), this.get('colors.length'));
      return this.get('colors')[index];
    }
  }),

  src: computed('fastboot.isFastBoot', 'image', function() {
    let image = this.get('image');

    if (!this.get('fastboot.isFastBoot')) {
      return image ? image : this.createInitials();
    } else {
      return image ? image : '';
    }
  }),

  fastboot: computed(function() {
    return getOwner(this).lookup('service:fastboot');
  }),

  onError: computed('image', function() {
    if (this.get('image')) {
      return this._checkImage.bind(this);
    }
  }),

  createInitials() {
    return this.get('initialsStore').initialsFor(this.initialsProperties());
  },

  initialsProperties() {
    return {
      width: 100,
      height: 100,
      initials: Initials(this.get('name') || this.get('defaultName')),
      initialsColor: this.get('textColor'),
      textStyles: assign({}, this._textStyles(), this.get('textStyles')),
      backgroundStyles: assign({}, this._backgroundStyles(), this.get('backgroundStyles')),
    };
  },

  _textStyles() {
    return {
      'font-family': this.get('fontFamily'),
      'font-weight': this.get('fontWeight'),
      'font-size': `${this.get('fontSize')}px`,
    };
  },

  _backgroundStyles() {
    return {
      'background-color': this.get('backgroundColor'),
    };
  },

  _checkImage(e) {
    e.srcElement.src = this.createInitials();
  },
});
