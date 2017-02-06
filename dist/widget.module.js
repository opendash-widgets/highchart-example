var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WidgetController = function () {
  function WidgetController($adapter, $element, $scope, moment, lodash) {
    _classCallCheck(this, WidgetController);

    this.$adapter = $adapter;
    this.$adapter = $adapter;
    this.$scope = $scope;
    this.moment = moment;
    this.lodash = lodash;

    this.loadDevice(this.config.id || null);

    // Highchart-ng Data:
    this.hcData = {
      chart: {
        type: "line"
      },
      series: []
    };
  }

  _createClass(WidgetController, [{
    key: 'loadDevice',
    value: function loadDevice(id) {
      var _this = this;

      if (!id) return null;

      var $adapter = this.$adapter;
      var _ = this.lodash;

      var request = this.$adapter.get(id);

      request.then(function (data) {

        _this.device = data;

        _this.loadHistory(data);
      });

      request.then(null, console.error);
    }
  }, {
    key: 'getSensor',
    value: function getSensor(device) {
      return this.lodash.filter(device.sensors, function (sensor) {
        return sensor['@type'] === 'od.sensor.currenttemp';
      })[0] || null;
    }
  }, {
    key: 'loadHistory',
    value: function loadHistory(device) {
      var _this2 = this;

      var $adapter = this.$adapter;
      var moment = this.moment;
      var _ = this.lodash;

      var sensor = this.getSensor(device);
      var sensorId = sensor['@id'];

      if (!sensor) return [];

      var request = this.$adapter.values({
        id: sensorId,
        history: {
          aggregation: 3,
          since: moment().subtract(10, 'day')
        }
      });

      request.then(function (values) {

        values = _.map(values, function (value) {
          return value.value;
        });

        console.log(values);

        _this2.hcData.series.push({
          name: device.name,
          type: 'area',
          data: values
        });
      });

      request.then(null, console.error);
    }
  }]);

  return WidgetController;
}();

WidgetController.$inject = ['od.adapter.service', '$element', '$scope', 'moment', 'lodash'];

var widgetTemplate = "<div style=\"text-align: center; padding: 10px; width: 100%; height: 100%;\">\n  <highchart id=\"highchart-widget-example\" config=\"$ctrl.hcData\"></highchart>\n</div>";

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SettingsController = function () {
  function SettingsController($adapter, lodash) {
    _classCallCheck$1(this, SettingsController);

    this.$adapter = $adapter;
    this.lodash = lodash;

    this.loadDevices();
  }

  _createClass$1(SettingsController, [{
    key: 'loadDevices',
    value: function loadDevices() {
      var _this = this;

      var $adapter = this.$adapter;
      var _ = this.lodash;

      var request = this.$adapter.list({});

      request.then(function (data) {

        data = _.filter(data, function (device) {
          return _this.isSupported(device['@type']);
        });

        data = _.map(data, function (device) {
          return {
            id: device['@id'],
            name: device.name
          };
        });

        _this.devices = data;
      });

      request.then(null, console.error);
    }
  }, {
    key: 'isSupported',
    value: function isSupported(key) {
      switch (key) {
        case 'od.device.Room:Thermostat':
          return true;

        default:
          return false;
      }
    }
  }]);

  return SettingsController;
}();

SettingsController.$inject = ['od.adapter.service', 'lodash'];

var settingsTemplate = "<label>Gerät auswählen:</label>\n<select ng-model=\"$ctrl.config.id\">\n  <option ng-repeat=\"option in $ctrl.devices\" value=\"{{option.id}}\">{{option.name}}</option>\n</select>";

var defaultPresets = [{
    name: 'Highchart Example',
    image: '/assets/vendor/opendash-widget-highchart-example/assets/preset.png',
    description: 'Beispiel für die Nutzung von Highchart in open.DASH2',
    config: {
        name: 'Highchart Example',
        config: {}
    }
}];

var index = (function (options) {

    options = options || {};

    var presets = options.presets || defaultPresets;

    return {
        widgetController: WidgetController,
        widgetTemplate: widgetTemplate,
        settingsController: SettingsController,
        settingsTemplate: settingsTemplate,
        presets: presets
    };
});

export default index;
//# sourceMappingURL=widget.module.js.map
