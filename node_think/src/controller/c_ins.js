// JavaScript source code
/*
  机构中心 To B

 */
const Base = require('./base.js');

module.exports = class extends Base {
    //得到所有的机构
    async get_insAction() {
        var data = this.get();
        var page = data.page;
        if (page == null) { //得到页数
            console.log("the page is default 1");
            page = 1
        }
        const ins = this.model('institute')
        const d = await ins.getListPage(page, 5);
        console.log(d);
        return this.success(d);
    }
}