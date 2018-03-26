import Service from './-utils/service';
import { tracked } from '@glimmer/component';

export default class Analytics extends Service {

  @tracked onlineCustomers = null;
  @tracked state = null;
  intervalId = null;

  pollUpdates() {
    console.log('polling');
    this.intervalId = setInterval(() => {
      this.state = 'fetching';
      this.notify();
      this.fetch().then((number) => {
        this.state = "success";
        this.onlineCustomers = number;
        console.log('update');
        this.notify();
      });
    }, 2000);
  }

  stopPolling() {
    console.log('stoped polling');
    clearInterval(this.intervalId);
  }

  fetch() {
    return new Promise((resolve) => {
      var timeoutID = window.setTimeout(() => {
        resolve(+new Date());
        clearTimeout(timeoutID)
      }, 2000)
    });
  }
}
