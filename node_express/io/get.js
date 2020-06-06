
var http = require('http');
var querystring = require('querystring');
//var data = {
//    a: 123,
//    time: new Date().getTime()
//};

var options = {
    hostname: '127.0.0.1',
    port: 3000,
    path: '/pay/pay_callback?' + content,
    method: 'GET'
};


function http_get(hostname, port, path, data, callback) {

    var content = querystring.stringify(data);
    options.hostname = hostname;
    options.port = port;
    options.path = path;

    var req = http.request(options, function (res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
            if (callback != null)
                callback(chunk);
        });
    });
    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
    req.end();
}