import objectHash from 'object-hash';

export default function hash(object = {}) {
  return objectHash(object);
}
