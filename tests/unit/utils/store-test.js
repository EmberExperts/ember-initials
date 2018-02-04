import { module, test } from 'ember-qunit';
import Base from 'ember-initials/utils/generators/base';
import Store from 'ember-initials/utils/store';

module('Unit | Store | Ember Initials', {
  subject: Store.create()
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
  store.set('cache', {});

  let properties = { width: 100, height: 100, initials: "SC", initialsColor: "red" };
  assert.ok(store.initialsFor(properties));
  assert.equal(Object.keys(store.get('cache')).length, 1);

  assert.ok(store.initialsFor(properties));
  assert.equal(Object.keys(store.get('cache')).length, 1);
});
