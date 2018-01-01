import Ember$ from 'jquery';
import { Promise as EmberPromise } from 'rsvp';
import { test } from 'ember-qunit';
import { moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { initialize as storeInitializer } from 'ember-initials/instance-initializers/ember-initials-store';

moduleForComponent('ember-initials', 'Ember initials Component Tests', {
  integration: true,

  beforeEach() {
    storeInitializer(this);
  }
});

function imagePromise(container, svg = true) {
  return new EmberPromise((resolve) => {
    if (svg) {
      Ember$.get(container.$('img').attr('src'), (image) => {
        resolve(Ember$(image));
      });
    } else {
      resolve(container.$('img'));
    }
  });
}

test('has alternative component', function (assert) {
  this.render(hbs`{{ember-initials/initials name="Super cool"}}`);
  assert.equal(this.$('img').length, 1);
});

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

test('when src is overridden by an image', function (assert) {
  let done = assert.async();
  this.set('userAvatar', '/images/logo.png');
  this.render(hbs`{{ember-initials src=userAvatar}}`);

  imagePromise(this, false).then((image) => {
    let src = image.attr('src');
    assert.equal(src, this.get('userAvatar'));
    done();
  });
});

test('when image is set and exist', function (assert) {
  let done = assert.async();
  this.set('userAvatar', '/images/logo.png');
  this.render(hbs`{{ember-initials image=userAvatar name="Ember Initials"}}`);

  imagePromise(this, false).then((image) => {
    let src = image.attr('src');
    assert.equal(src, this.get('userAvatar'));
    done();
  });
});

test('when image is set but is empty', function (assert) {
  let done = assert.async();
  this.set('userAvatar', '');
  this.render(hbs`{{ember-initials image=userAvatar name="Ember Initials"}}`);

  imagePromise(this).then((svg) => {
    let initials = svg.text();
    assert.equal(initials, 'EI');
    done();
  });
});

test('when gravatar is set', function (assert) {
  let done = assert.async();
  this.set('userAvatar', '/images/logo.png');
  this.set('gravatarEmail', 'example@example.com');
  this.render(hbs`{{ember-initials gravatarEmail=gravatarEmail image=userAvatar name="Ember Initials"}}`);

  imagePromise(this, false).then((image) => {
    let src = image.attr('src');
    assert.equal(src, this.get('userAvatar'));
    done();
  });
});
