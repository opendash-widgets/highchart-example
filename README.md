# highchart-example

Use me like this:

```
$ opendash widget:init example-widget
  Initialize new open.DASH Widget 'example-widget':
    -> Starting login attempt as 'od-demo'...
    -> Logged in as open.DASH Demo Account (od-demo).
    -> Starting download of widget template 'UniSiegenWiNeMe/opendash-widget-template' into './example-widget'...
    -> Download of 'UniSiegenWiNeMe/opendash-widget-template' finished.
    -> Initialization of 'example-widget' finished.

$ cd ./example-widget

$ npm install
$ opendash widget:build
$ cd ../path/to/instance
$ npm link ../path/to/example-widget

```