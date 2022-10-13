// const cheerio = require('cheerio');
// const { art } = require('@/utils/render');
// const path = require('path');

module.exports = async (ctx) => {
    // 使用 RSSHub 提供的 puppeteer 工具类，初始化 Chrome 进程
    const browser = await require('@/utils/puppeteer')();
    // 创建一个新的浏览器页面
    const page = await browser.newPage();
    // 访问指定的链接

    const link = 'https://www.1688.com';
    console.debug('start 1688 process');
    await page.goto(link);
    const link2 = 'https://s.1688.com/selloffer/offer_search.htm?keywords=%B1%ED%BF%DB&n=y&netType=1%2C11%2C16&spm=a260k.dacugeneral.search.0';
    await page.goto(link2);
    const title = await page.title();
    if (title.includes('全球领先的采购批发平台,')) {
        console.debug('enter login page ');
        const element = await page.$('#fm-login-id');
        console.debug(element);
        await element.type('易得资源超市', { delay: 30 });
        const elementPassword = await page.$('#fm-login-password');
        await elementPassword.type('xtz102888', { delay: 30 });
        await page.waitForNavigation(); // 等待跳转
    }
    const title2 = await page.title();
    console.debug(title2);
    // // 渲染目标网页

    // const html2 = await page.$$(".company-name");

    const names = await page.$$eval('#sm-offer-list > div > div > div.mojar-element-company > div.company-name > a > div', (companys) => companys.map((name) => name.innerText));
    console.log(names);

    // 关闭浏览器进程
    browser.close();
    ctx.state.data = {
        // title: '', // 项目的标题
        link: '', // 指向项目的链接
        description: '', // 描述项目
        language: '', // 频道语言
        allowEmpty: false, // 默认 false，设为 true 可以允许 item 为空
        item: [
            {
                title: 'ss', // 文章标题
                // author2: html+"11", // 文章作者
                autor: title, // 文章作者
            },
        ],
    };
    for (const index in names) {
        ctx.state.data.item[index] = { author: names[index] };
    }
};
