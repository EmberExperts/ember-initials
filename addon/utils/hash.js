import md5 from 'blueimp-md5';

export default function hash(object = {}) {
  return md5(serialize(object));
}

function serialize(obj) {
  if (Array.isArray(obj)) {
    return JSON.stringify(obj.map(i => serialize(i)))
  } else if (typeof obj === 'object' && obj !== null) {
    return Object.keys(obj).sort().map(k => `${k}:${serialize(obj[k])}`).join('|')
  }

  return obj
}
