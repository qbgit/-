

const dgram = require('dgram');
const server = dgram.createSocket('udp4');
module.exports = class extends think.Service {
    api_send(data) {

        var PORT = 33333;
        var HOST = '127.0.0.1';

        var message = Buffer.from(data);

        var client = dgram.createSocket('udp4');

        client.send(message, PORT, HOST, function (err, bytes) {
            if (err) throw err;
            console.log('UDP message sent to ' + HOST + ':' + PORT);
            client.close();
        })
    }
}
//var dgram = require("dgram");

//var message = new Buffer("hello node js");

//var client = dgram.createSocket("udp4");

//client.send(message, 0, message.length, 41234, "localhost", function (err, bytes) {
//    client.close();
//});

