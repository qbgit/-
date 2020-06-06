/**
 * @author qianbo
 * @description rabbitmq 输出消息
 */

'use strict'
var amqp = require('amqplib/callback_api');

var _connection;
var _channel;
var _connected = false;
var queue = 'qmessage';

var _channel_delay;
const delayExchange = 'delayEx';
const delayQueue = 'delayQueue';
var _connection1;
amqp.connect('amqp://admin:admin@localhost:5672', function(error0, connection) {
  if (error0) {
    _connected = false;
    throw error0;
  }

  _connection = connection;
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var msg = 'Hello world';
    _channel = channel;
    _channel.assertQueue(queue, {
      durable: false
    });
    _connected = true;
    _channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });
});
amqp.connect('amqp://admin:admin@localhost:5672', function(error0, connection1) {
  if (error0) {
    _connected = false;
    throw error1;
  }
  _connection1 = connection1;
  _connection1.createChannel(function(error1,channel_delay){
    if (error1) {
      throw error1;
    }
    _channel_delay = channel_delay;
    _channel_delay.assertExchange(delayExchange, 'direct', { durable: true });
    _channel_delay.assertQueue(delayQueue, {
      exclusive: false,
      deadLetterExchange: "t1dead",
      deadLetterRoutingKey: "t1deadrouting",
    });
    _channel_delay.bindQueue(delayQueue, delayExchange);
   
  });

});

function sendDelayMessage(msg,tt){
  console.log("send delay");
  _channel_delay.sendToQueue(delayQueue,Buffer.from(msg), {
      expiration: tt.toString()
    });
}



function sendMessage(msg){
   if(_connected)
   {
    _channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
   }
}
setTimeout(() => {
  for(var i = 0; i<200;i++){
    var json = {name:"test",num:i};
    sendMessage(JSON.stringify(json));
    var tt = 1000* i;
    var delayJson = {name:"qianbo111",delay:tt};
    sendDelayMessage(JSON.stringify(delayJson),tt);
  }

}, 2000);



/*
下载安装rabbitmq:
docker pull registry.docker-cn.com/library/rabbitmq:3.6-management
启动rabbitmq:docker run -d -p 5672:5672 -p15672:15672 --name myrabbitmq 01d6274c2217
5672:默认的客户端连接的端口
15672：默认的web管理界面的端口
*/