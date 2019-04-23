import Base from 'ember-initials/utils/generators/base';
import Store from 'ember-initials/utils/store';
import { module, test } from 'qunit';

module('Unit | Store | Ember Initials', function(hooks) {
  hooks.beforeEach(function() {
    this.subject = Store.create();
  });

  test('it exists', function(assert) {
    let store = this.subject;
    assert.ok(store);
  });

  test('it uses image generator', function(assert) {
    let store = this.subject;
    assert.ok(store.get('generator') instanceof Base);
  });

  test('initialsFor', function(assert) {
    let store = this.subject;

    let properties = { width: 100, height: 100, initials: "SC", initialsColor: "red" };
    assert.ok(store.initialsFor(properties));
    assert.equal(store.cache.size, 1);

    let newProperties = { width: 100, height: 100, initials: "SC", initialsColor: "red" };
    assert.ok(store.initialsFor(newProperties));
    assert.equal(store.cache.size, 1);
  });
});
