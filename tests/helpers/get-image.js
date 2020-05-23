import { Promise as EmberPromise } from 'rsvp';

export default function getImage(container, svg = true) {
  return new EmberPromise(async(resolve, reject) => {
    const img = container.element.querySelector('img');

    if (!img) {
      return reject('No img selector!');
    }

    if (svg) {
      return fetch(img.getAttribute('src')).then(async(response) => {
        const wrapper = document.createElement('div');

        wrapper.innerHTML = await response.text();
        resolve(wrapper.firstElementChild);
      });
    }

    resolve(img);
  });
}
