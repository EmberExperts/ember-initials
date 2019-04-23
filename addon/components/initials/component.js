import { getOwner } from '@ember/application';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { assign } from '@ember/polyfills';
import { inject as service } from '@ember/service';
import ColorIndex from 'ember-initials/utils/color-index';
import Initials from 'ember-initials/utils/initials';
import overridableComputed from 'ember-initials/utils/overridable-computed';
import Store from 'ember-initials/utils/store';
import layout from './template';

export default Component.extend({
  fastboot: service(),

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

  isFastBoot: reads('fastboot.isFastBoot'),

  title: reads('name'),
  height: reads('size'),
  width: reads('size'),
  alt: reads('name'),
  name: reads('defaultName'),
  seedText: reads('name'),

  config: computed(function() {
    return getOwner(this).resolveRegistration('config:environment').emberInitials;
  }).readOnly(),

  shouldRenderSVG: computed('isFastBoot', 'image', function() {
    return !this.image && this.isFastBoot
  }),

  textStyles: overridableComputed(function() {
    return {};
  }),

  backgroundStyles: overridableComputed(function() {
    return {};
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

  src: computed(
    'isFastBoot', 'image', 'backgroundColor', 'initials', 'textColor', 'fontSize', 'fontWeight', 'fontFamily',
  function() {
    let image = this.image;

    if (image) return image;
    return this.isFastBoot ? '' : this.createInitials();
  }).readOnly(),

  cacheStore: computed(function() {
    return this._lookupForCacheStore() || this._registerCacheStore();
  }).readOnly(),

  onError: computed('image', function() {
    if (this.image) {
      return this._assignInitialsSrc.bind(this);
    }
  }).readOnly(),

  createInitials() {
    return this.cacheStore.initialsFor(this.initialsProperties());
  },

  initialsProperties() {
    return {
      width: 100,
      height: 100,
      initials: this.initials,
      initialsColor: this.textColor,
      textStyles: assign({}, this._textStyles(), this.textStyles),
      backgroundStyles: assign({}, this._backgroundStyles(), this.backgroundStyles),
    };
  },

  _textStyles() {
    return {
      'font-family': this.fontFamily,
      'font-weight': this.fontWeight,
      'font-size': `${this.fontSize}px`,
    };
  },

  _backgroundStyles() {
    return {
      'background-color': this.backgroundColor,
    };
  },

  _assignInitialsSrc(e) {
    e.srcElement.src = this.createInitials();
  },

  _lookupForCacheStore() {
    return getOwner(this).lookup('store:ember-initials');
  },

  _registerCacheStore() {
    getOwner(this).register('store:ember-initials', Store);
    return this._lookupForCacheStore();
  }
});
