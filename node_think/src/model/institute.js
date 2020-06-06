// JavaScript source code
module.exports = class extends think.Model {
    getList(page) {
        var start = (page.current - 1) * page.itempage;
        //this.s.limit(start, page.itempage);
        return this.field('name').select();


    }
    async getListPage(page, num) {
        // SQL: SELECT * FROM `test_d` LIMIT 0,10
        //const list1 = await this.page(1).select(); // 查询第一页，每页 10 条
        // SQL: SELECT * FROM `test_d` LIMIT 20,20
        const list2 = await this.page(page, num).select(); // 查询第二页，每页 20 条
        return list2;
    }

};
