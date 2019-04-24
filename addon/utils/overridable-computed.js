import { computed, get, set } from '@ember/object';

function cacheFor(object) {
  const cache = get(object, '__CP_CACHE__');
  return cache || set(object, '__CP_CACHE__', new Map());
}

export default function(...args) {
  let config = {};

  if (typeof args[args.length - 1] === "object") {
    config = args.pop();
  } else if (typeof args[args.length -1] === "function") {
    config = { get: args.pop() };
  }

  const dependentKeys = args;

  return computed(...dependentKeys, {
    get(key) {
      const cache = cacheFor(this);
      if (cache.has(key)) return cache.get(key);

      if (config.get) {
        return config.get.apply(this, arguments)
      }
    },

    set(key, value) {
      value = config.set ? config.set.apply(this, arguments) : value;
      return cacheFor(this).set(key, value) && value;
    }
  })
}
