import { module, test } from 'qunit';
import ColorIndex from 'ember-initials/utils/color-index';

module('Unit | Utils | Color Index', function() {
  test('color index', function(assert) {
    let text = 'Ember Initials'
    assert.equal(ColorIndex(text, 27), 6);
  });

  test('when text is null', function(assert) {
    assert.equal(ColorIndex(null, 27), 0);
  });
});
