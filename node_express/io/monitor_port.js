const exec = require('child_process').exec;
check();
function check(){
  let last = exec('lsof -i:8080');
  last.on('exit', function(code){
    if(code != '0'){
      console.log('������������,���ڽ�������');
    } else {
      console.log('����������������');
    }
  });
  serTimeout(check,10000);
}
function run (){
  let last = exec ('node server.js');
  last.on('exit',function (code){
     if(code == '0') {
      console.log('���������Ѿ������ɹ�');
    } else {
      console.log('������������ʧ��');
    }
  })
} 