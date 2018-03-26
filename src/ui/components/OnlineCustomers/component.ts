import Online from '../../../services/online';
import Analytics from '../../../services/analytics';
import Component, { tracked } from '@glimmer/component';
import trackService from '../../../utils/tracked';

@trackService('online')
@trackService('analytics')
export default class OnlineCustomers extends Component {
  online: Online;
  analytics: Analytics;

  @tracked('online')
  get isDisabled() {
    return !this.online.isOnline;
  }

  @tracked('analytics')
  get status() {
    return this.analytics.state;
  }

  @tracked('analytics')
  get customers() {
    return this.analytics.onlineCustomers;
  }

  _online = () => {
    this.analytics.pollUpdates();
  };

  _offline = () => {
    this.analytics.stopPolling();
  }

  constructor(options) {
    super(options);

    if (!this.isDisabled) {
      this._online();
    }

    self.addEventListener('WecoOnline', this._online);
    self.addEventListener('WecoOnline', this._offline);
  }

}
