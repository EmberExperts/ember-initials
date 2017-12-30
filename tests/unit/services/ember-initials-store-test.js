import { moduleFor, test } from 'ember-qunit';
import Base from 'ember-initials/utils/generators/base';

moduleFor('service:ember-initials-store', 'Unit | Service | initials store');

test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('it uses image generator', function(assert) {
  let service = this.subject();
  assert.ok(service.get('generator') instanceof Base);
});

test('initialsFor', function(assert) {
  let service = this.subject();
  service.set('cache', {});

  let properties = { width: 100, height: 100, initials: "SC", initialsColor: "red" };
  assert.ok(service.initialsFor(properties));
  assert.equal(Object.keys(service.get('cache')).length, 1);

  assert.ok(service.initialsFor(properties));
  assert.equal(Object.keys(service.get('cache')).length, 1);
});

test('removeAll', function(assert) {
  let service = this.subject();
  service.set('cache', {a: 1, b: 2});

  service.removeAll();
  assert.equal(Object.keys(service.get('cache')).length, 0);
});
