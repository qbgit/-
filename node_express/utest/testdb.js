var MySqldb = require('../common/mysql-client')


var obj = new MySqldb();
var p1 = obj.count("user",{avatar:"xxx"});
p1.then(function(data){
    console.log("count is :",data);
});



obj.select("user",{avatar:"xxx"},1)
.then(
    function(data){
        console.log('resolved');
        console.log(data[0].avatar);
    }, 
    function(reason, data){
        console.log('rejected');
        console.log(reason);
    }

);
