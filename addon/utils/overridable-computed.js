import { computed, get, set } from '@ember/object';

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
      if (get(this, `__CP_CACHE__${key}`) !== undefined) {
        return get(this, `__CP_CACHE__${key}`);
      }

      if (config.get) {
        return config.get.apply(this, arguments)
      }
    },

    set(key, value) {
      return set(this, `__CP_CACHE__${key}`, config.set ? config.set.apply(this, arguments) : value);
    }
  })
}
