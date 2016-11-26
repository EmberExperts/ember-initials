import { module, test } from 'qunit';
import { generateInitials } from 'ember-initials/-private/generators';

module('Unit | Private | Generators');

test('initials generator', function(assert) {
  let name;

  name = 'John Doe';
  assert.equal(generateInitials(name), 'JD');

  name = 'Ľatin Ćhars';
  assert.equal(generateInitials(name), 'ĽĆ');

  name = 'small letters';
  assert.equal(generateInitials(name), 'SL');

  name = 'BIG LETTERS';
  assert.equal(generateInitials(name), 'BL');

  name = '.@d &^*';
  assert.equal(generateInitials(name), '.&');

  name = 'one';
  assert.equal(generateInitials(name), 'O');

  name = 'Two';
  assert.equal(generateInitials(name), 'T');

  name = 'ćma';
  assert.equal(generateInitials(name), 'Ć');
});
