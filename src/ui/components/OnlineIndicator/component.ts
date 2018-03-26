import Online from '../../../services/online';
import Component, { tracked } from '@glimmer/component';
import trackService from '../../../utils/tracked';

@trackService('online')
export default class OnlineIndicator extends Component {
  online: Online;

  @tracked('online')
  get isDisabled() {
    return !this.online.isOnline;
  }
}
