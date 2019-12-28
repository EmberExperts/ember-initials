import svgToMiniDataURI from 'mini-svg-data-uri';
import SvgGenerator from '../utils/generators/svg';

export default class Store {
  static cache = new Map();

  svgGenerator = new SvgGenerator();

  initialsFor(properties) {
    const key = JSON.stringify(properties);
    return Store.cache.get(key) || this._create(key, properties);
  }

  _create(key, properties) {
    const element = this.svgGenerator.generate(properties);
    const data = svgToMiniDataURI(element);

    return Store.cache.set(key, data) && data;
  }
}
