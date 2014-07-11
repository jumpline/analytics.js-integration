var integration = require('integration');

var Attracta = integration('Attracta Analytics')
  .global('_attracta')
  .option('siteId', '')
  .option('attrEndPoint', 'http://attracta-ng.tools.init3.com')
  .assumesPageview()
  .readyOnInitialize();

Attracta.prototype.track = function (event, properties) {
  window._attracta.push(['track', event, properties]);

  // construct an HTTP request
  var xhr = new XMLHttpRequest();
  var mUrl = this.options.attrEndPoint + '/metrics';
  xhr.open(mUrl, 'post', true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  // send the collected data as JSON
  xhr.send(JSON.stringify(properties));

  xhr.onloadend = function () {
    // done
  };
};
