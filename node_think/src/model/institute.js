// JavaScript source code
module.exports = class extends think.Model {
    getList(page) {
        var start = (page.current - 1) * page.itempage;
        //this.s.limit(start, page.itempage);
        return this.field('name').select();


    }
    async getListPage(page, num) {
        // SQL: SELECT * FROM `test_d` LIMIT 0,10
        //const list1 = await this.page(1).select(); // ��ѯ��һҳ��ÿҳ 10 ��
        // SQL: SELECT * FROM `test_d` LIMIT 20,20
        const list2 = await this.page(page, num).select(); // ��ѯ�ڶ�ҳ��ÿҳ 20 ��
        return list2;
    }

};
