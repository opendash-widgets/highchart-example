export default class WidgetController {

  static $inject = ['od.adapter.service', '$element', '$scope', 'moment', 'lodash'];

  constructor($adapter, $element, $scope, moment, lodash) {

    this.$adapter = $adapter;
    this.$adapter = $adapter;
    this.$scope = $scope;
    this.moment = moment;
    this.lodash = lodash;

    this.loadDevice(this.config.id || null);

    // Highchart-ng Data:
    this.hcData = {
      chart: {
        type: "line",
      },
      series: [],
    }
  }

  loadDevice(id) {

    if(!id) return null;

    let $adapter = this.$adapter;
    let _ = this.lodash;

    let request = this.$adapter.get(id)
    
    request.then(data => {
      
      this.device = data;

      this.loadHistory(data);

    });

    request.then(null, console.error);
  }

  getSensor(device) {
    return this.lodash.filter(device.sensors, sensor => sensor['@type'] === 'od.sensor.currenttemp')[0] || null;
  }

  loadHistory(device) {

    let $adapter = this.$adapter;
    let moment = this.moment;
    let _ = this.lodash;

    let sensor = this.getSensor(device);
    let sensorId = sensor['@id'];

    if(!sensor) return [];

    let request = this.$adapter.values({
      id: sensorId,
      history: {
        aggregation: 3,
        since: moment().subtract(10, 'day')
      }
    });
    
    request.then(values => {

      values = _.map(values, value => value.value);

      console.log(values);

      this.hcData.series.push({
        name: device.name,
        type: 'area',
        data: values,
      });

    });

    request.then(null, console.error);
  }
}