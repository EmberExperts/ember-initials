import { render } from '@ember/test-helpers';
import getImage from 'dummy/tests/helpers/get-image';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('ember-initials', function(hooks) {
  setupRenderingTest(hooks);

  test('has alternative component', async function(assert) {
    await render(hbs`{{ember-initials/initials name="Super cool"}}`);
    assert.dom('img').exists({ count: 1 });
  });

  test('has correct tag name', async function(assert) {
    await render(hbs`{{ember-initials name="Super cool"}}`);
    assert.dom('img').exists({ count: 1 });
  });

  test('has correct initials', async function(assert) {
    assert.expect(1);

    await render(hbs`{{ember-initials name="Super cool"}}`);

    await getImage(this).then((img) => assert.equal(img.textContent, 'SC'));
  });

  test('has correct default name', async function(assert) {
    assert.expect(1);

    await render(hbs`{{ember-initials}}`);

    await getImage(this).then((img) => assert.equal(img.textContent, '?'));
  });

  test('when name and default name are empty', async function(assert) {
    assert.expect(1);

    await render(hbs`{{ember-initials name='' defaultName=''}}`);

    await getImage(this).then((img) => assert.equal(img.textContent, ''));
  });

  test('when src is overridden by an image', async function(assert) {
    assert.expect(1);

    this.set('userAvatar', '/images/logo.png');

    await render(hbs`{{ember-initials image=userAvatar}}`);

    await getImage(this, false).then((img) => assert.equal(img.getAttribute('src'), this.get('userAvatar')));
  });

  test('when image is set and exist', async function(assert) {
    assert.expect(1);

    this.set('userAvatar', '/images/logo.png');

    await render(hbs`{{ember-initials image=userAvatar name="Ember Initials"}}`);

    await getImage(this, false).then((img) => assert.equal(img.getAttribute('src'), this.get('userAvatar')));
  });

  test('when image is set but is empty', async function(assert) {
    assert.expect(1);

    this.set('userAvatar', '');

    await render(hbs`{{ember-initials image=userAvatar name="Ember Initials"}}`);

    await getImage(this).then((img) => assert.equal(img.textContent, 'EI'));
  });

  test('when gravatar is set', async function(assert) {
    assert.expect(1);

    this.set('userAvatar', '/images/logo.png');
    this.set('gravatarEmail', 'example@example.com');

    await render(hbs`{{ember-initials gravatarEmail=gravatarEmail image=userAvatar name="Ember Initials"}}`);

    await getImage(this, false).then((img) => assert.equal(img.getAttribute('src'), this.get('userAvatar')));
  });
});
