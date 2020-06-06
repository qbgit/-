const config = require("./config")
const client = require('seneca')()
  .use('seneca-amqp-transport')
  .client({
    type: 'amqp',
    pin: 'cmd:log,level:log',
    url: process.env.AMQP_URL
  });

setInterval(function() {
  client.act('cmd:log,level:log', {
    message: 'Hello World'
  }, (err, res) => {
    if (err) {
      // Handle error in some way
      throw err;
    }
    // Print out the response
    console.log(res);
  });
}, 2000);