import svgToMiniDataURI from 'mini-svg-data-uri';
import SvgGenerator from '../utils/generators/svg';

const cache = new Map();

export default class Store {
  svgGenerator = new SvgGenerator();

  initialsFor(properties) {
    const key = JSON.stringify(properties);
    return cache.get(key) || this._create(key, properties);
  }

  _create(key, properties) {
    const element = this.svgGenerator.generate(properties);
    const data = svgToMiniDataURI(element);

    return cache.set(key, data) && data;
  }
}
