const exec = require('child_process').exec;
check();
function check(){
  let last = exec('lsof -i:8080');
  last.on('exit', function(code){
    if(code != '0'){
      console.log('主服务器崩溃,正在进行重启');
    } else {
      console.log('主服务器正常运行');
    }
  });
  serTimeout(check,10000);
}
function run (){
  let last = exec ('node server.js');
  last.on('exit',function (code){
     if(code == '0') {
      console.log('主服务器已经重启成功');
    } else {
      console.log('主服务器重启失败');
    }
  })
} 