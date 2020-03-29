import { module, test } from 'qunit';
import colorIndex from 'ember-initials/utils/color-index';

module('Unit | Utils | Color Index', function() {
  test('color index', function(assert) {
    const text = 'Ember Initials';

    assert.equal(colorIndex(text, 27), 6);
  });

  test('when text is null', function(assert) {
    assert.equal(colorIndex(null, 27), 0);
  });
});
