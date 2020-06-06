const Base = require('./base.js');

module.exports = class extends Base {
    async testAction() {
        var data = this.post() ///获取到提交上来的所有数据
        console.log(data)
        const user = this.model('user')
        const d = await user.getList()
        console.log(d);
        return this.success(d)
    }
    async gohttpAction() {
        const cli = think.service('http');
        const x = await cli.api_get("http://127.0.0.1:9000");
        return this.success(x);
    }
    async udpAction() {
        var data = this.get()
        const cli = think.service('udpc');
        cli.api_send(data);
    }

};
