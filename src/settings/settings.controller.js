export default class SettingsController {

  static $inject = ['od.adapter.service', 'lodash'];

  constructor($adapter, lodash) {

    this.$adapter = $adapter;
    this.lodash = lodash;

    this.loadDevices();
  }

  loadDevices() {

    let $adapter = this.$adapter;
    let _ = this.lodash;

    let request = this.$adapter.list({})
    
    request.then(data => {

      data = _.filter(data, device => this.isSupported(device['@type']));

      data = _.map(data, device => {
        return {
          id: device['@id'],
          name: device.name,
        };
      });

      this.devices = data;
    })

    request.then(null, console.error);
  }

  isSupported(key) {
    switch (key) {
      case 'od.device.Room:Thermostat':
        return true;
    
      default:
        return false;
    }
  }
}