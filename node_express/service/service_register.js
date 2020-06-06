'use strict'
const Path = require("path");
const config = require("./config")
//注册服务器为redis的第一个数据库

let _use_redis = 0;
let mqaddress = config.amqp.address;

console.log("rabbit mq address:",mqaddress)

/* 钱波 暂时不启动 redis 服务器*/
if(_use_redis == 1){
    var redis = require("redis", { db: 1 }),
        client = redis.createClient();


    client.on("error", function (err) {
        //错误
        _useredis = 0;
        console.log("Error " + err);
    });
}
//注册服务器
var server_list = {};


class register_server{
  
    static pop(host,port){
        let hostport = host +":" +  port;
        delete server_list[hostport];
    }
    static push(name,host,port,des){
        let hostport = host +":" +  port;
        if(server_list[hostport]==null){
            let s = { name: name, host: host, port: port, des: des, health: {} };
            let key = host + ":" + port;
            server_list[key] = s;
            return 0;
        }
        else{
            return -1;
        }
    }
    static sethealth(host,port,health){
        let hostport = host +":" +  port;
        if(server_list[hostport]!=null)
            server_list[hostport].healthh = health;
     }
    static gethealth(host,port){
        let hostport = host +":" +  port;
        if(server_list[hostport]!=null)
            return server_list[hostport].health;
        return null;
    }
    static getserverlist(){
        //for (let index in this.server_list){
        //    console.log(index);
        //    console.log(this.server_list[index]);
        //}
        return server_list;
    }

}



require('seneca')()
    .use('seneca-amqp-transport')

    .add('role:server,cmd:register', function(msg,respond) {
        let host = msg.host;
        let port = msg.port;
        let des  = msg.des;
        let name = msg.name;
        if(register_server.push(name,host,port,des) == -1){
            respond(null,{ret:-1});
        }
        else{
            let hostport = host+":"+port;
            respond(null,{ret:0,id:hostport});
        }

        // return new Promise((resolve) => {
        //     resolve()
        // })
    })
    .add('role:server,cmd:health',function(msg,respong){
        //cpu使用率
        let cpu = msg.cpu;
        let mem_total = msg.total_mem;
        let mem_free = msg.mem_free;
    })
    .listen({
        type: 'tcp', 
        pin: 'role:server',
        port:9004
    })
    .listen({
        type: 'amqp',
        pin: 'role:server',
        url: config.amqp.address
    });


//node register_server.js --seneca.log.error

// var obj=new register_server();
// obj.push("db1","127.0.0.1",3306,"mysql db");
// obj.push("db2","192.168.1.11",3306,"mysql db2");
// obj.push("db3","192.168.1.22",3307,"mysql db3");
// obj.server_list_get();
//console.log(obj.server_list_search("127.0.0.1",3307));
