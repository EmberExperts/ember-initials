import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

class ExamplesComponent extends Component {
  @tracked activeExample;

  @action
  onChange(value) {
    this.activeExample = value;
  }
}

export default ExamplesComponent;
