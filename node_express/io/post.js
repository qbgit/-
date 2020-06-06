/**
 * author :钱波
 * 发送信息
 * */
var http = require('http');
var querystring = require('querystring');


var options = {
    hostname: '127.0.0.1',
    port: 3000,
    path: '/pay/pay_callback',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    }
};


function setoption(hostname, port, path) {
    options.hostname = hostname;
    options.path = path;
    options.port = port;
}

function http_post(hostname, port, path, postdata, callback) {
    var content = "";
    if (postdata != null || postdata == "")
        content = postdata;
    var content = querystring.stringify(postdata);
    setoption(hostname, port, path);
    var req = http.request(options, function (res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
            if (callback != null)
                callback(chunk);
            //JSON.parse(chunk)
        });
    });
    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
    // write data to request body
    req.write(content);
    req.end();
}

module.exports = http_post;
//unit test
function show(data) {
    console.log(data);
}

var data = {
    groupId: "30001",
    description: "秘钥拥有着",
    userName:"user1"
};



http_post("192.168.30.11",5001,"/WeBASE-Node-Managerb/user/userinfo",  )
