import Mixin from '@ember/object/mixin';
import Avatar from 'ember-initials/mixins/avatar';
import { assign } from '@ember/polyfills';
import { observer, computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import ColorIndex from 'ember-initials/utils/color-index';
import Initials from 'ember-initials/utils/initials';
import { getOwner } from '@ember/application';
import Store from '../utils/store';

export default Mixin.create(Avatar, {
  image: null,

  defaultName: '?',
  defaultBackground: '#dd6a58',

  fontSize: 50,
  fontWeight: 200,
  textColor: 'white',
  fontFamily: 'Helvetica Neue Light, Arial, sans-serif',

  name: reads('defaultName'),
  seedText: reads('name'),

  textStyles: computed(function() {
    return {};
  }),

  backgroundStyles: computed(function() {
    return {};
  }),

  colors: computed(function() {
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

  src: computed('fastboot.isFastBoot', 'image', function() {
    let image = this.get('image');

    if (image) return image;
    return this.get('fastboot.isFastBoot') ? '' : this.createInitials();
  }),

  initialsObserver: observer('name', 'seedText', 'fontSize', 'fontWeight', 'fontFamily', 'textColor', 'defaultName', function () {
    this.notifyPropertyChange('src');
  }),

  backgroundColor: computed('colors.length', 'seedText', 'defaultName', 'defaultBackground', {
    get() {
      let { colors, seedText, defaultName, defaultBackground } = this;

      if (this._backgroundColor) {
        return this._backgroundColor;
      }

      if (seedText === defaultName) {
        return defaultBackground;
      } else {
        let index = ColorIndex(seedText, colors.length);
        return colors[index];
      }
    },

    set(key, value) {
      return this._backgroundColor = value;
    }
  }),

  cacheStore: computed(function() {
    return this._lookupForCacheStore() || this._registerCacheStore();
  }),

  onError: computed('image', function() {
    if (this.get('image')) {
      return this._assignInitialsSrc.bind(this);
    }
  }),

  createInitials() {
    return this.get('cacheStore').initialsFor(this.initialsProperties());
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
