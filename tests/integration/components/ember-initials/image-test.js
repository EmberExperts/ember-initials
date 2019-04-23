import { render } from '@ember/test-helpers';
import getImage from 'dummy/tests/helpers/get-image';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('ember-initials/image', function(hooks) {
  setupRenderingTest(hooks);

  test('when image is set and exist', async function(assert) {
    assert.expect(1);

    this.set('userAvatar', '/images/logo.png');

    await render(hbs`{{ember-initials/image image=userAvatar}}`);

    await getImage(this, false).then((img) => assert.equal(img.getAttribute('src'), this.get('userAvatar')));
  });

  test('when image is empty defaultImage is rendered', async function(assert) {
    assert.expect(1);

    this.set('userAvatar', '');

    await render(hbs`{{ember-initials/image image=userAvatar}}`);

    await getImage(this, false).then((img) => assert.equal(img.getAttribute('src'), null));
  });
});
