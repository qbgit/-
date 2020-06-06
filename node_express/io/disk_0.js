/**
 * author :钱波
 * 抓取所有磁盘，注意不适合windows
 * */

var si = require('systeminformation'),
  utils = require('./utils');

//var colors = utils.colors;
class disk_class {

    say(callback) {
        si.fsSize()
            .then(data => {
                var disk = data[0];
                //console.log(disk)

                data = [{
                    use: utils.humanFileSize(disk.used, true),
                    size: utils.humanFileSize(disk.size, true),
                    percent: disk.use / 100
                }];
                if (callback != null)
                    callback(data);
            })
            .catch(error => console.error(error))

    }

}

module.exports = new disk_class();
//unit test
//function call(data) {
//    console.log(data);
//}
//var disk = new disk_class();
//disk.say(call);

//module.exports = Disk;

