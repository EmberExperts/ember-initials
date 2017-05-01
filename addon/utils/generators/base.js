// This is an Initials Image Generator Interface
// You have to implement these methods if you want to create your own generator

// revoke(url) {
//   should revoke image from browser cache
// }

// generate(properties) {
//   should return generated image url
// }

export default class {
  constructor() {
    this._implement(this.revoke, 'revoke');
    this._implement(this.generate, 'generate');
  }

  _implement(fn, name) {
    if (typeof fn !== "function" || fn.length !== 1) {
      throw `Base Generator: '${name}' function has to be implemented with exactly one argument!`
    }
  }
}
