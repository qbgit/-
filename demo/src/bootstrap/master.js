// invoked in master
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
function callback(data) {
    console.log(data);
}

think.beforeStartServer(async () => {
    server.on('close', () => {
        console.log('socket已关闭');
    });

    server.on('error', (err) => {
        console.log(err);
    });

    server.on('listening', () => {
        console.log('socket port 20000 正在监听中...');
    });

    server.on('message', (msg, rinfo) => {
        console.log(`receive message from ${rinfo.address}:${rinfo.port}`);
        if (callback) {
            //callback 进行rtp拼包处理
            callback(msg);
        }
        //server.send('exit', rinfo.port, rinfo.address)
    });

    server.bind('20000');
})