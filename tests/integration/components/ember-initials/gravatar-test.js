import Ember$ from 'jquery';
import { Promise as EmberPromise } from 'rsvp';
import { test } from 'ember-qunit';
import { moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-initials/gravatar', 'Ember initials Component Tests', { integration: true });

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

test('when image is not set a gravatar is rendered', function (assert) {
  let done = assert.async();
  this.set('gravatarEmail', 'example@example.com');
  this.render(hbs`{{ember-initials/gravatar email=gravatarEmail}}`);

  imagePromise(this, false).then((image) => {
    let src = image.attr('src');
    assert.equal(src, "//www.gravatar.com/avatar/23463b99b62a72f26ed677cc556c44e8?size=30");
    done();
  });
});

test('when image is set and exist', function (assert) {
  let done = assert.async();
  this.set('userAvatar', '/images/logo.png');
  this.render(hbs`{{ember-initials/gravatar image=userAvatar}}`);

  imagePromise(this, false).then((image) => {
    let src = image.attr('src');
    assert.equal(src, this.get('userAvatar'));
    done();
  });
});
