// JavaScript source code
var si = require('systeminformation');
const proc = require('./proc_0');


class connection {


    //procdata 进程信息
    say(callback) {
        //this.callback = callback;
        proc.say(function (procdata) {
            si.networkConnections()
                .then(data => {
                    var pu = [];
                    data.map((net, i) => {
                        if (net.state == 'LISTEN') {
                            // console.log(net);
                            //console.log("net pid", net.pid);
                            //console.log("get pid name",proc.getpidname('"'+net.pid+'"'));
                            let name = proc.getpidname('"' + net.pid + '"');
                            //console.log(name);
                            if (name != null) {
                                net.procname = name;
                            }
                            pu.push(net);
                            //console.log(net);
                        }
                    });
                    if (callback != null) {
                        callback(pu);
                        //console.log("pu", pu);
                    }
                })
                .catch(error => console.error(error));

        });
    }
    sayname(callback, comparename) {
        proc.say(function (procdata) {
            si.networkConnections()
                .then(data => {
                    var pu = [];
                    data.map((net, i) => {
                        if (net.state == 'LISTEN') {
                            // console.log(net);
                            //console.log("net pid", net.pid);
                            //console.log("get pid name",proc.getpidname('"'+net.pid+'"'));
                            let name = proc.getpidname('"' + net.pid + '"');
                            //console.log(name);
                            if (name != null) {
                                net.procname = name;
                            }
                            if(name == comparename)
                                pu.push(net);
                            //console.log(net);
                        }
                    });
                    if (callback != null) {
                        callback(pu);
                        //console.log("pu", pu);
                    }
                })
                .catch(error => console.error(error));

        });
    }
}

module.exports = new connection();

/*
 * unit test
//包含连接信息和连接的进程名称
function callback(data) {
    console.log(data);
}

var x = new connection();
x.say(callback);
*/