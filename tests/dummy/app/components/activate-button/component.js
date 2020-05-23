import Component from '@glimmer/component';
import { action } from '@ember/object';

class ActivateButtonComponent extends Component {
  @action
  activate(value) {
    this.args.onChange(value);
  }

  @action
  deactivate() {
    this.args.onChange(null);
  }
}

export default ActivateButtonComponent;
