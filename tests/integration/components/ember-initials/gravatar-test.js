import { render } from '@ember/test-helpers';
import getImage from 'dummy/tests/helpers/get-image';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('ember-initials/gravatar', function(hooks) {
  setupRenderingTest(hooks);

  test('when image is not set a gravatar is rendered', async function(assert) {
    assert.expect(1);

    const gravatarUrl = '//www.gravatar.com/avatar/23463b99b62a72f26ed677cc556c44e8?size=30';

    this.set('gravatarEmail', 'example@example.com');

    await render(hbs`{{ember-initials/gravatar email=gravatarEmail}}`);

    await getImage(this, false).then((img) => assert.equal(img.getAttribute('src'), gravatarUrl));
  });

  test('when image is set and exist', async function(assert) {
    assert.expect(1);

    this.set('userAvatar', '/images/logo.png');

    await render(hbs`{{ember-initials/gravatar image=userAvatar}}`);

    await getImage(this, false).then((img) => assert.equal(img.getAttribute('src'), this.userAvatar));
  });
});
