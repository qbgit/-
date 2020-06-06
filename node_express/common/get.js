var http = require('http');
var https = require('https');

function GetData(url, cb) {
    http.get(url, function (res) {
    // console.log("Got response: " + res.statusCode);
    res.setEncoding('utf8');  
    res.on('data', function (chunk) {
        //console.log('BODY: ' + chunk);
        var data = JSON.parse(chunk);
        if(cb!=null)
            cb(1,data);
        //for (var i = 0; i < data.length; i++) {
        //    console.log("chunk %d ",i);
        //    console.log(data[i]);
        //}

    });
}).on('error', function (e) {
    console.log("Got error: " + e.message);
    if(cb!=null)
        cb(-1,e.message);
});
}

function https_get(url, cb) {
    https.get(url, function (res) {
    // console.log("Got response: " + res.statusCode);
    res.setEncoding('utf8');  
    res.on('data', function (chunk) {
        var data = JSON.parse(chunk);
        if(cb!=null)
            cb(1,data);
    });
}).on('error', function (e) {
    console.log("Got error: " + e.message);
    if(cb!=null)
        cb(-1,e.message);
});
}
// GetData('http://www.wl.brjzbs.com/api/granary/granarypoints.json', print);
exports.GetData = GetData;
exports.https_get = https_get;