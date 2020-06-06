'use strict';
  
var seneca = require('seneca')()
const config = require("../config")

let mqaddress = config.amqp.address;

console.log("rabbit mq address:",mqaddress)

const client = require('seneca')()
  .use('seneca-amqp-transport')
  .client({
    type: 'amqp',
    pin: 'role:server',
    url: mqaddress
  });
  // .client({
  //   type: 'tcp',
  //   pin: 'role:server'
  // });

  
  export class register_client{
  /*
  static func0(resolve, reject) {
    var timeOut = Math.random() * 2;
    log('set timeout to: ' + timeOut + ' seconds.');
    client.act({
      role: 'server', cmd: 'register',
      host: host, des: des, port: port, name: name, des: des
    }, (err, result) => {

      if (err) {
        reject(err);
      }
      else {
        resolve(result);
      }
    });//act
  }*/
  static register(host, port, name, des) {
    return new Promise((resolve, reject) => {
      client.act({
        role: 'server', cmd: 'register',
        host: host, des: des, port: port, name: name, des: des
      }, (err, result) => {

        if (err) {
          reject(err);
        }
        else {
          resolve(result);
        }
      });//act
    });//promise
  }//register

  

}

//
//使用方法：
{
  register_client.register("192.168.3.244", 1935, "qianbo", "test").then(function (result) {
    console.log(result);

  }).catch(function (err) {
    console.log(err);
  });
}
//   setInterval(function () {
//   client.act('cmd:register', {
//     name: 'message_server',
//     host:"127.0.0.1",
//     port:9003,
//     pid: process.pid,
//     file: Path.relative(process.cwd(), __filename),
//     now: Date.now()
//   }, (err, res) => {
//     if (err) {
//       throw err;
//     }
//     console.log(res);
//   });
// }, 2000);

  console.log("end");
//node test_service.js --seneca.log.error
