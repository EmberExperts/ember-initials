import { module, test } from 'qunit';
import initials from 'ember-initials/utils/initials';

module('Unit | Utils | Initials', function() {
  test('initials generator', function(assert) {
    let name;

    name = 'John Doe';
    assert.equal(initials(name), 'JD');

    name = 'Ľatin Ćhars';
    assert.equal(initials(name), 'ĽĆ');

    name = 'small letters';
    assert.equal(initials(name), 'SL');

    name = 'BIG LETTERS';
    assert.equal(initials(name), 'BL');

    name = '.@d &^*';
    assert.equal(initials(name), '.&');

    name = 'one';
    assert.equal(initials(name), 'O');

    name = 'Two';
    assert.equal(initials(name), 'T');

    name = 'ćma';
    assert.equal(initials(name), 'Ć');
  });
});
