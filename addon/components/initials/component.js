import { getOwner } from '@ember/application';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { assign } from '@ember/polyfills';
import ColorIndex from 'ember-initials/utils/color-index';
import Initials from 'ember-initials/utils/initials';
import overridableComputed from 'ember-initials/utils/overridable-computed';
import Store from 'ember-initials/utils/store';
import layout from './template';

export default Component.extend({
  layout,
  tagName: '',

  size: 30,
  image: null,
  defaultBackground: '#dd6a58',
  fontSize: 50,
  fontWeight: 'Helvetica Neue Light, Arial, sans-serif',
  fontFamily: 200,
  textColor: 'white',
  defaultName: '?',

  title: reads('name'),
  height: reads('size'),
  width: reads('size'),
  alt: reads('name'),
  name: reads('defaultName'),
  seedText: reads('name'),

  textStyles: overridableComputed('fontSize', 'fontWeight', 'fontFamily', {
    get() {
      return this._defaultTextStyles();
    },

    set(key, value = {}) {
      return assign({}, this._defaultTextStyles(), value);
    }
  }),

  backgroundStyles: overridableComputed('backgroundColor', {
    get() {
      return this._defaultBackgroundStyles();
    },

    set(key, value = {}) {
      return assign({}, this._defaultBackgroundStyles(), value);
    }
  }),

  colors: overridableComputed(function() {
    return [
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
  }),

  backgroundColor: overridableComputed('colors.[]', 'seedText', 'defaultName', 'defaultBackground', function() {
    let { colors, seedText, defaultName, defaultBackground } = this;

    if (seedText === defaultName) {
      return defaultBackground;
    } else {
      let index = ColorIndex(seedText, colors.length);
      return colors[index];
    }
  }),

  initials: computed('name', 'defaultName', function() {
    return Initials(this.name || this.defaultName);
  }).readOnly(),

  src: computed('image', 'height', 'width', 'backgroundStyles', 'initials', 'textColor', 'textStyles', function() {
    if (this.image) {
      return this.image;
    }

    const properties = {
      width: this.width,
      height: this.height,
      initials: this.initials,
      initialsColor: this.textColor,
      textStyles: this.textStyles,
      backgroundStyles: this.backgroundStyles,
    };

    return this.cacheStore.initialsFor(properties);
  }).readOnly(),

  cacheStore: computed(function() {
    return this._lookupForCacheStore() || this._registerCacheStore();
  }).readOnly(),

  onError: computed(function() {
    return (e) => e.srcElement.src = this.initialsSrc;
  }).readOnly(),

  _defaultTextStyles() {
    return {
      'font-family': this.fontFamily,
      'font-weight': this.fontWeight,
      'font-size': `${this.fontSize}px`,
    };
  },

  _defaultBackgroundStyles() {
    return {
      'user-select': 'none',
      'vertical-align': 'middle',
      'background-color': this.backgroundColor,
    };
  },

  _lookupForCacheStore() {
    return getOwner(this).lookup('store:ember-initials');
  },

  _registerCacheStore() {
    getOwner(this).register('store:ember-initials', Store);
    return this._lookupForCacheStore();
  }
});
