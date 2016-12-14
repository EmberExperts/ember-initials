import Ember from 'ember';
import { test } from 'ember-qunit';
import { moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-initials', 'Ember initials Component Tests', { integration: true });

function svgObject(container) {
  let base64 = container.$('img').attr('src').split('base64,')[1];
  return Ember.$(window.atob(base64))[0];
}

test('has correct tag name', function (assert) {
  this.render(hbs`{{ember-initials name="Super cool"}}`);
  assert.equal(this.$('img').length, 1);
});

test('has correct initials', function (assert) {
  this.render(hbs`{{ember-initials name="Super cool"}}`);

  let svg = svgObject(this);
  let initials = svg.textContent;

  assert.equal(initials, 'SC');
});

test('has correct default name', function (assert) {
  this.render(hbs`{{ember-initials}}`);

  let svg = svgObject(this);
  let initials = svg.textContent;

  assert.equal(initials, '?');
});

test('when name and default name are empty', function (assert) {
  this.render(hbs`{{ember-initials name='' defaultName=''}}`);

  let svg = svgObject(this);
  let initials = svg.textContent;

  assert.equal(initials, '');
});
