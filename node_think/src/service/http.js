// JavaScript source code
var request = require('request');

module.exports = class extends think.Service {
    /**
       * init
       * @return {}         []
       */
    constructor(ctx) {
        super(ctx);
        this.http = ctx;
    }

    api_get(url) {
        return new Promise((resolve, reject) => request.get(url, (err, response, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        }));
    }
    api_post(url, data) {

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
    //async api_get(url) {
    //    return await getdata(url);
    //    //console.log(x);
    //}
    //async api_post(url, data) {
    //    let x = await postdata(url, data);
    //    console.log("poist:", x);
    //}

}