const got = require('@/utils/got');
// const cheerio = require('cheerio');
// const { art } = require('@/utils/render');
// const path = require('path');

module.exports = async (ctx) => {
    const response = await got({
        method: 'get',
        url: 'https://www.alibaba.com/trade/search?fsb=y&IndexArea=product_en&CatId=&tab=all&SearchText=watch+buckle',
    });
    console.debug("111");
    const data = response.data;
    // const $ = cheerio.load(data); // 使用 cheerio 加载返回的 HTML
    // const list = $('div[data-item_id]');
    const pattern = /"supplierName":"(.*?)"/g;
    const names = data.match(pattern);
    ctx.state.data = {
        // title: '', // 项目的标题
        link: '', // 指向项目的链接
        description: '', // 描述项目
        language: '', // 频道语言
        allowEmpty: false, // 默认 false，设为 true 可以允许 item 为空
        item: [
            // 其中一篇文章或一项内容
            // {
            //     // title: 'hello world', // 文章标题
            //     author: names[0], // 文章作者
            // },
        ],
        // items :names
    };
    for (const index in names) {
        ctx.state.data.item[index] = { author: names[index] };
    }
};
