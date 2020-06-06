const child_process = require('child_process');
const connection = require('./connection.js');
console.log('当前工作目录: ', process.cwd())
console.log('当前模块文件目录: ', __dirname)

connection.sayname(callback, 'vectorqb.exe');
function callback(data) {
    let number = data.length;
    //for (let i = 0; i < number; i++) {
      //  console.log(data[i]);
    //}
    if (number == 0) {
        console.log("vectorqb not run,now run");
        runvector();
    }
    else {
        console.log("vectorqb is running");
        for (let i = 0; i < number;i++)
            console.log(data.length, ":",data[i].localport);
    }
}

//var x = new connection();
//connection.sayname(callback,'vectorqb.exe');

function runvector() {
    var cp = child_process.spawn('vectorqb.exe', []);

    cp.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });
    cp.on('close', function (code) {
        console.log('子进程已退出，退出码 ' + code);
    });
    cp.stderr.on('data', function (data) {
        //throw errors
        console.log('stderr: ' + data);
    });
}
setInterval(() => {
    connection.sayname(callback, 'vectorqb.exe');
}, 10000);