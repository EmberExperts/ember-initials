import Ember from 'ember';
import { test } from 'ember-qunit';
import { moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-initials', 'Ember initials Component Tests', { integration: true });

function imagePromise(container) {
  return new Ember.RSVP.Promise((resolve) => {
    let src = container.$('img').attr('src');

    Ember.$.get(src, (svg) => {
      resolve(Ember.$(svg));
    });
  });
}

test('has correct tag name', function (assert) {
  this.render(hbs`{{ember-initials name="Super cool"}}`);
  assert.equal(this.$('img').length, 1);
});

test('has correct initials', function (assert) {
  let done = assert.async();

  this.render(hbs`{{ember-initials name="Super cool"}}`);

  imagePromise(this).then((svg) => {
    let initials = svg.text();
    assert.equal(initials, 'SC');
    done();
  });
});

test('has correct default name', function (assert) {
  let done = assert.async();
  this.render(hbs`{{ember-initials}}`);

  imagePromise(this).then((svg) => {
    let initials = svg.text();
    assert.equal(initials, '?');
    done();
  });
});

test('when name and default name are empty', function (assert) {
  let done = assert.async();
  this.render(hbs`{{ember-initials name='' defaultName=''}}`);

  imagePromise(this).then((svg) => {
    let initials = svg.text();
    assert.equal(initials, '');
    done();
  });
});
