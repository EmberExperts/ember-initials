import svgToMiniDataURI from 'mini-svg-data-uri';
import SvgGenerator from '../utils/generators/svg';

export default class Store {
  cache = new Map();
  svgGenerator = new SvgGenerator();

  get length() {
    return this.cache.size;
  }

  clear() {
    this.cache.clear();
  }

  getItem(properties) {
    const key = JSON.stringify(properties);
    return this.cache.get(key) || this._create(key, properties);
  }

  _create(key, properties) {
    const element = this.svgGenerator.generate(properties);
    const data = svgToMiniDataURI(element);

    return this.cache.set(key, data) && data;
  }
}
