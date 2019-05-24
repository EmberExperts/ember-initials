import { computed as emberComputed, set } from '@ember/object';

export function overridableComputed(...args) {
  let config = {};

  if (typeof args[args.length - 1] === "object") {
    config = args.pop();
  } else if (typeof args[args.length -1] === "function") {
    config = { get: args.pop() };
  }

  const dependentKeys = args;

  return emberComputed(...dependentKeys, {
    get(key) {
      if (`#${key}` in this) return this[`#${key}`];

      if (config.get) {
        return config.get.apply(this, arguments)
      }
    },

    set(key, value) {
      return set(this, `#${key}`, config.set ? config.set.apply(this, arguments) : value);
    }
  })
}

export function computed() {
  return emberComputed(...arguments).readOnly();
}
