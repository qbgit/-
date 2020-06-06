// JavaScript source code
var request = require('request');
//var url = "http://127.0.0.1:9000";

function getdata(url) {
    return new Promise((resolve, reject) => request.get(url, (err, response, body) => {
        if (err) {
            reject(err);
        } else {
            resolve(body);
        }
    }));
}
function postdata(url, data) {

    return new Promise((resolve, reject) => request.post({
        url: url,//    json: true,
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data)
    }, function (err, response, body) {
        if (err) {
            reject(err);
        } else {
            resolve(body);
        }
    }));
//request.post({ url: '', form: { key: 'value' } }, function (error, response, body) {
//    if (!error && response.statusCode == 200) {
//    console.log(body) // 请求成功的处理逻辑  
//}
//})
}
async function api_get(url)
{
    let x = await getdata(url);
    console.log(x);
}
async function api_post(url, data) {
    let x = await postdata(url, data);
    console.log("poist:", x);
}

api_get("http://127.0.0.1:9000");
api_post("http://127.0.0.1:9000");

//var requestData = "需要传输的数据";
//request({
//    url: url,
//    method: "POST",
//    json: true,
//    headers: {
//        "content-type": "application/json",
//    },
//    body: JSON.stringify(requestData)
//}, function (error, response, body) {
//    if (!error && response.statusCode == 200) {
//    console.log(body) // 请求成功的处理逻辑
//}
//    }); 


//request.post({ url: '', form: { key: 'value' } }, function (error, response, body) {
//    if (!error && response.statusCode == 200) {
//    console.log(body) // 请求成功的处理逻辑  
//}
//})