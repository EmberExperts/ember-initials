import { module, test } from 'qunit';
import Initials from 'ember-initials/utils/initials';

module('Unit | Utils | Initials', function() {
  test('initials generator', function(assert) {
    let name;

    name = 'John Doe';
    assert.equal(Initials(name), 'JD');

    name = 'Ľatin Ćhars';
    assert.equal(Initials(name), 'ĽĆ');

    name = 'small letters';
    assert.equal(Initials(name), 'SL');

    name = 'BIG LETTERS';
    assert.equal(Initials(name), 'BL');

    name = '.@d &^*';
    assert.equal(Initials(name), '.&');

    name = 'one';
    assert.equal(Initials(name), 'O');

    name = 'Two';
    assert.equal(Initials(name), 'T');

    name = 'ćma';
    assert.equal(Initials(name), 'Ć');
  });
});
