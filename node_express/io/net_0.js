var si = require('systeminformation'),
    utils = require('./utils');

class net_class {


    updateData(data,callback) {
        //console.log(data);
        var rx_sec = Math.max(0, data['rx_sec']);
        var tx_sec = Math.max(0, data['tx_sec']);

        //this.netData[0].shift();
        //this.netData[0].push(rx_sec);

        //this.netData[1].shift();
        //this.netData[1].push(tx_sec);

        //rx_label = 'Receiving:      ' +
        //    utils.humanFileSize(rx_sec) +
        //    '/s \nTotal received: ' +
        //    utils.humanFileSize(data['rx_bytes']);

        //tx_label = 'Transferring:      ' +
        //    utils.humanFileSize(tx_sec) +
        //    '/s \nTotal transferred: ' +
        //    utils.humanFileSize(data['tx_bytes']);

        if (callback != null) {
            callback(
                {
                    rxsec: utils.humanFileSize(rx_sec),
                    txsec: utils.humanFileSize(tx_sec),
                    total_r: utils.humanFileSize(data['rx_bytes']),
                    total_s: utils.humanFileSize(data['tx_bytes'])
                }
            )
        }

    };


    say(callback) {
        si.networkInterfaceDefault(iface => {
            var that = this;
            var updater = function () {
                si.networkStats(iface, data => {
                    that.updateData(data[0],callback);
                });
            }
            updater();
        })
    }
}
module.exports = new net_class();

//µ¥Ôª²âÊÔ
//function call(data) {
//    console.log(data);
//}
//var net = new net_class();

//setInterval(() => {
//    net.say(call);
//}, 1000);


//function Net(sparkline) {
//  this.sparkline = sparkline;
//  this.netData = [Array(61).fill(0), Array(61).fill(0)];
//}


//module.exports = Net;
