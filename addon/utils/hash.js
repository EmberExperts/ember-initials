import { typeOf, isBlank } from '@ember/utils';

export default function hash(properties, hashIt = true) {
  if (isBlank(properties)) {
    return 'undefined';
  }
  if (typeOf(properties) !== 'object') {
    return properties.toString();
  }

  let pKeys = Object.keys(properties).sort();
  let result = [];
  pKeys.forEach((key) => {
    let value = properties[key];
    if (typeOf(value) !== 'string') {
      value = hash(value, false)
    }
    result = result.concat([key, value]);
  });

  if (hashIt) {
    return result.toString();
  }

  return result.toString();
}
