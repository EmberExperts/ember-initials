import hash from 'dummy/utils/hash';
import { module, test } from 'qunit';

module('Unit | Utility | hash');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = hash();
  assert.ok(result);
});

test('it knows how to handle an object', function(assert) {
  let key = hash({a: 'b', c: 'd'});
  assert.equal(key, 'a,b,c,d');
});

test('it knows how to order keys', function(assert) {
  let key = hash({c: 'd', a: 'b'});
  assert.equal(key, 'a,b,c,d');
});

test('it knows how to handle nested objects', function(assert) {
  let properties = {
    a: 'b',
    c: ['d', 'e'],
    f: {
      g: 'h',
      i: 'j'
    }
  };

  let key = hash(properties);
  assert.equal(key, "a,b,c,d,e,f,g,h,i,j")
});

test('it knows how to handle integers', function(assert) {
  let properties = {
    a: 1
  };

  let key = hash(properties);

  assert.equal(key, 'a,1');
})
