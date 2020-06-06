var si = require('systeminformation'),
    utils = require('./utils');

var mem_Count;
var mem_Swap;

class mem_class {
    say(callback) {
        si.mem()
            .then(data => {
                var memPer = (100 * (1 - data.available / data.total)).toFixed();
                var swapPer = (100 * (1 - data.swapfree / data.swaptotal)).toFixed();

                swapPer = isNaN(swapPer) ? 0 : swapPer;


                var memTitle =
                    utils.humanFileSize(data.total - data.available) +
                    ' of ' +
                    utils.humanFileSize(data.total);

                var swapTitle =
                    utils.humanFileSize(data.swaptotal - data.swapfree) +
                    ' of ' +
                    utils.humanFileSize(data.swaptotal);

                mem_Count = {
                    percent: memPer / 100,
                    label: memTitle,
                };
                mem_Swap = {
                    percent: swapPer / 100,
                    label: swapTitle
                }

                console.log(mem_Count, mem_Swap);
            })
            .catch(error => console.error(error))

    }
}
module.exports = new mem_class();


/**
 * µ¥Ôª²âÊÔ
 * @param {any} data
 */
//function call(data) {
//    console.log(data);
//    //console.log("test");
//}

//var mem = new mem_class();
//mem.say(call);

//module.exports = Mem;
