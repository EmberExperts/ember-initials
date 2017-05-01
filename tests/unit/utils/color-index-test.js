import { module, test } from 'qunit';
import ColorIndex from 'ember-initials/utils/color-index';

module('Unit | Utils | Color Index');

test('color index', function(assert) {
  let text = 'Ember Initials'
  assert.equal(ColorIndex(text, 27), 6);
});
