/**
 * author :钱波
 * 抓取所有进程
 * */

var si = require('systeminformation'),
  utils = require('./utils');
var hashmap = require('hashmap')
//var colors = utils.colors;

class proc_class {
//var hashmap
    say(callback) {
        si.processes()
            .then(data => {
                //var pu = [];
                this.hashmap_pid = new hashmap();
                this.array = [];
                var data1 = data.list
                    .map(p => {
                        var value = {
                            pid: p.pid,
                            cmd: p.name, //.slice(0,10),
                            cpuuse: p.pcpu.toFixed(1),
                            memuse: p.pmem.toFixed(1)
                        }
                        this.hashmap_pid.set('"'+p.pid+'"', value)
                        this.array.push(value);

                        //pu.push()
                    })
                if (callback != null) {
                   // console.log("...start to print...",this.hashmap_pid);
                    callback(this.array);
                }
            })
            .catch(error => console.error(error));
    }

    getpidname(id) {
        //console.log("hashmap", this.hashmap_pid);
        //console.log("want to find", id);
        let test = this.hashmap_pid.get(id);
        //console.log("test is ", test);
        if (test != null) {
            return test.cmd;
            //console.log("find it",test);
        }
        return null;     
        //return this.hashmap_pid;
    }

}



module.exports = new proc_class();
/*
 * unit test
//function call(data) {
//    console.log(data);
//}
//var proc = new proc_class();
//proc.say(call);
*/
