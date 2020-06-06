// JavaScript source code
/*
  �������� To B

 */
const Base = require('./base.js');

module.exports = class extends Base {
    //�õ����еĻ���
    async get_insAction() {
        var data = this.get();
        var page = data.page;
        if (page == null) { //�õ�ҳ��
            console.log("the page is default 1");
            page = 1
        }
        const ins = this.model('institute')
        const d = await ins.getListPage(page, 5);
        console.log(d);
        return this.success(d);
    }
}