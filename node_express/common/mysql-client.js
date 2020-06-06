// +----------------------------------------------------------------------
// | Insist service [ 内容管理服务 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2019 http://www.insistqb.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: qianbo <418511899@qq.com> 钱波
// +----------------------------------------------------------------------

var util = require('util');
var mysql = require('mysql');

pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "test",
  port: 3306,
});


console.log("connect is ok");

module.exports = class MySqldb {

  constructor() {
  }

  async update(tablename, obj, id) {
    var p = new Promise(function(resolve, reject){
         var sql0 = util.format("update %s SET ? where id=%d", tablename, id);
         var sql = mysql.format(sql0, obj);
         pool.getConnection(function(error,connection){
             if(error)
                reject(error);
              else{
                connection.query(sql, function (error, results, fields) {
                  connection.release();
                  if (error) //throw error;
                    reject(error);
                  else{
                   // console.log(results);
                    resolve(results.affectedRows);
                  }
                });
              }
      });
    
    });
    return p;
  }

  async insert(tablename,obj){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
      var sql0 = util.format("INSERT INTO %s SET ?", tablename);
      console.log(sql0);
      pool.getConnection(function (error, connection) {
        if (error) {
          reject(error);
        }
        else {
          connection.query(sql0, obj, function (error, results, fields) {
            connection.release();
            if (error)
              reject(error);
            else{
              resolve(results.insertId);
            }

          });
        }
      });
    });
    return p;
  }
  
  async count(tablename, obj) {
    return new Promise((resolve) => {
      let sql = null;
      if(obj == null)
        sql = util.format("select count(*) as count from %s",tablename);
      else
        sql = util.format("select count(*) as count from %s where ?", tablename);
      pool.getConnection(function (error, connection) {
        if (error) {
          reject(error);
        }
        else {
          connection.query(sql, obj, function (error, results, fields) {
            connection.release();
            if (!error) {
              resolve(results[0]["count"]);
            }
            else {
              resolve(-1);
            }
          });
        }
      })
    });
  }

  async select(tablename, obj, page) {

    var p = new Promise(function (resolve, reject) {
      //做一些异步操作
        let sql0 = null;
        if(obj == null)
          sql0 = util.format("select * from  %s", tablename);
        else
          sql0 = util.format("select * from  %s where ?", tablename);

        pool.getConnection(function (error, connection) {
        connection.query(sql0, obj, function (error, results, fields) {
          connection.release();
          if (error)
            reject(error);
          else
            resolve(results);
        });
        });
    });
    return p;
  } //select over

};



// exports.init = function (config) {
//   pool = mysql.createPool({
//       host: "localhost",
//       user: "root",
//       password: "root",
//       database: "test",
//       port: 3306,
//   });
// };



// obj.select("user",{avatar:"xxx"},1)
// .then(
//     function(data){
//         console.log('resolved');
//         console.log(data);
//     }, 
//     function(reason, data){
//         console.log('rejected');
//         console.log(reason);
//     }

// );

//obj.update("user",{avatar:"yu"},1);
// console.log("insert");
// obj.insertAsync("user",{avatar:'dddddddwexxx',nickname:'d1111123qbddddd',uid:'xxxx'})
// .then(
//     function(data){
//         console.log('resolved');
//         console.log(data);
//     }, 
//     function(reason, data){
//         console.log('rejected');
//         console.log(reason);
//     }
// );



//update("user", { avatar: 'tdadfasd1111111111', nickname: 'ddddddd11' }, 1);


/////stream query
// var query = connection.query('SELECT * FROM notes');
// query
//   .on('error', function(err) {
//     // Handle error, an 'end' event will be emitted after this as well
//   })
//   .on('fields', function(fields) {
//     // the field packets for the rows to follow
//   })
//   .on('result', function(row) {
//     // Pausing the connnection is useful if your processing involves I/O
//     connection.pause();

//     // processRow(row, function() {
//     //   connection.resume();
//     // });
//   })
//   .on('end', function() {
//     // all rows have been received
//   });



  // connection.beginTransaction(function(err) {
  //   if (err) { throw err; }
  //   connection.query('INSERT INTO notes SET title=?', title, function (error, results, fields) {
  //     if (error) {
  //       return connection.rollback(function() {
  //         throw error;
  //       });
  //     }

  //     var log = 'Post ' + results.insertId + ' added';

  //     connection.query('INSERT INTO log SET data=?', log, function (error, results, fields) {
  //       if (error) {
  //         return connection.rollback(function() {
  //           throw error;
  //         });
  //       }
  //       connection.commit(function(err) {
  //         if (err) {
  //           return connection.rollback(function() {
  //             throw err;
  //           });
  //         }
  //         console.log('success!');
  //       });
  //     });
  //   });
  // });


//   getFileByPath('./files/1.txt')
// .then(function(data){
//   console.log("成功："+data);
//   return getFileByPath('./files/2.txt');
// }) //上面的then通过getFileByPath返回的是一个promise对象，所以可以继续.then串联调用（链式调用）
// .then(function(data){ 
//   console.log("成功："+data);
//   return getFileByPath('./files/3.txt');
// })
// .then(function(data){
//   console.log("成功："+data);
// })
// .catch(function(err){   
//   // catch作用： 上面所有的promise如果其中一个有错误，
//   //则终止下面所有的promise执行，且直接进入到catch中获取对应promise的异常错误信息
//   console.log('catch:'+err);
// })
