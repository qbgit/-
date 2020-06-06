var amqp = require('amqplib/callback_api');

/**
 * 消费一个死信队列
 * @author qianbo
 * @param { Object } connnection 
 */


var _channel_delay;
const deadExchange = 't1dead';
const deadQueue = 'deadQueue';
var _connection1;
amqp.connect('amqp://admin:admin@localhost:5672', function(error0, connection) {
    if (error0) {
        _connected = false;
        throw error0;
      }
      _connection1 = connection;
      _connection1.createChannel(function(error2,channel_delay){
        if (error2) {
          throw error2;
        }
        _channel_delay = channel_delay;
        _channel_delay.assertExchange(deadExchange, 'direct', { durable: true });
        _channel_delay.assertQueue(deadQueue, {
          exclusive: false,
          //deadLetterExchange: "t1dead",
          //deadLetterRoutingKey: "t1deadrouting",
        });
        _channel_delay.bindQueue(deadQueue, deadExchange,"t1deadrouting");
      
        _channel_delay.consume(deadQueue, msg => {
            console.log('consumer msg：', msg.content.toString());
        }, { noAck: true });

      });
      
});



