
var MySqldb = require('../common/mysql-client')


var obj = new MySqldb();


module.exports = function db_data(options) {
/////////////////////////////////
//机构
    this.add('role:db_data,cmd:institute_del', function del(msg, respond) {
        //删除操作
        console.log("I will delete the institute of ",msg.id)
        respond(null, { answer: msg.id })
    });

    this.add('role:db_data,cmd:institute_get',function add(msg,respond){
        obj.select("institute",null,1)
        .then(
            function(data){
                console.log('resolved');
                respond(null,data);
                console.log(data);
            }, 
            function(reason, data){
                console.log('rejected');
                respond(null,reason);
                console.log(reason);
            }
        
        );
    });
//////////////////////////////////////
//user 用户
    this.add('role:user,cmd:del', function del(msg, respond) {
        //删除操作
        console.log("I will delete the user of ",msg.id)
        respond(null, { answer: msg.id })
    });

    this.add('role:user,cmd:add',function add(msg,respond){
        console.log("add user");
        respond(null, {answer: 1});
    });
}