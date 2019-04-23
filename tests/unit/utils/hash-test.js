import hash from 'ember-initials/utils/hash';
import { module, test } from 'qunit';

class MyKlass {
  constructor(value = true) {
    this.value = value;
  }
}

module('Unit | Utility | hash', function() {
  test('when string is different', function(assert) {
    let objectHash = hash({
      string: 'string'
    });

    let otherObjectHash = hash({
      string: 'string1'
    });

    assert.notEqual(objectHash, otherObjectHash);
  });

  test('when number is different', function(assert) {
    let objectHash = hash({
      number: 100
    });

    let otherObjectHash = hash({
      number: 101
    });

    assert.notEqual(objectHash, otherObjectHash);
  });

  test('when array content is different', function(assert) {
    let objectHash = hash({
      array: ['string']
    });

    let otherObjectHash = hash({
      array: [{}]
    });

    assert.notEqual(objectHash, otherObjectHash);
  });

  test('when object content is different', function(assert) {
    let objectHash = hash({
      object: { string: 'string' }
    });

    let otherObjectHash = hash({
      object: { object: {} }
    });

    assert.notEqual(objectHash, otherObjectHash);
  });

  test('when object content is in different order', function(assert) {
    let objectHash = hash({
      object: { string: 'string' },
      string: 'string'
    });

    let otherObjectHash = hash({
      string: 'string',
      object: { string: 'string' }
    });

    assert.equal(objectHash, otherObjectHash);
  });

  test('when nested object content is different', function(assert) {
    let objectHash = hash({
      object: {
        array: [{ string: 'string' }]
      }
    });

    let otherObjectHash = hash({
      object: {
        array: [{ object: {} }]
      }
    });

    assert.notEqual(objectHash, otherObjectHash);
  });

  test('when nested object content is in different order', function(assert) {
    let objectHash = hash({
      object: {
        array: [{ string: 'string', array: [] }]
      }
    });

    let otherObjectHash = hash({
      object: {
        array: [{ array: [], string: 'string' }]
      }
    });

    assert.equal(objectHash, otherObjectHash);
  });

  test('when function is compared to object', function(assert) {
    let objectHash = hash({
      test: function() {}
    });

    let otherObjectHash = hash({
      test: {}
    });

    assert.notEqual(objectHash, otherObjectHash);
  });

  test('when instance of custom class is different', function(assert) {
    let objectHash = hash({
      customKlass: new MyKlass()
    });

    let otherObjectHash = hash({
      customKlass: new MyKlass(false)
    });

    assert.notEqual(objectHash, otherObjectHash);
  });
});
