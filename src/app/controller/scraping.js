const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const axios = require("axios");

const VideoController = require("./VideoController");

module.exports = {
    async scrape(req, res, next) {

        let page = req.params.page;
        page = page == 1 ? '' : 'page/' + page + '/';

        const html = await axios.get('https://spacetoday.com.br/author/admin/' + page);
        const $ = await cheerio.load(html.data);
        let data = [];

        $('article.vlog-post').each((i, elem) => {
            var link = $(this);
            data.push({
                id: $(elem).find('div.entry-image a').attr('data-id'),
                title: $(elem).find('div.entry-image a').attr('title'),
                link: $(elem).find('div.entry-image > a').attr('href'),
                image: $(elem).find('div.entry-image > a > img').attr('src'),
                time: $(elem).find('div.entry-header > div.entry-meta > div.meta-item > span.meta-icon').text()
            });

        });
        return res.status(200).send({ data });
    },

    async newsnow(req, res) {

        let page = req.params.page;
        var lastItem = (page * 10) - 1;
        var firstItem = lastItem - 9;

        const html = await axios.get('https://www.newsnow.com/us/Science/Astronomy?type=ln');
        const $ = await cheerio.load(html.data);
        let data = [];

        $('div.rs-grid--skeleton > main div.hl').each((i, elem) => {
            if (i >= firstItem) {
                data.push({
                    id: $(elem).attr('data-id'),
                    title: $(elem).find('a').text(),
                    link: $(elem).find('a').attr('href'),
                    counter: i
                });
            }
            if (i >= lastItem) return false;

        });

        return res.status(200).send({ data });
    },

    async post(req, res) {

        let page = req.params.page;
        const html = await axios.get(`https://spacetoday.com.br/${page}`);
        const $ = await cheerio.load(html.data);

        let data = {};

        $('div.vlog-site-content > article.post').each((i, elem) => {
            data = {
                title: $(elem).find('h1.entry-title').text(),
                article: {
                    ...$(elem).find('div.entry-content-single > p').map(function () {
                        return $(this).text();
                    }).get()
                },
                image: {
                    ...$(elem).find('div.entry-content-single > p > img').map(function () {
                        return $(this).attr('src');
                    }).get()
                },
                tags: {
                    ...$(elem).find('div.entry-content-single > div.meta-tags > a').map(function () {
                        return $(this).text();
                    }).get()
                },
                video: $(elem)
                    .find('div.entry-content-single div.tube-video-wrap div.tube-vc-embed div.fluid-width-video-wrapper').attr('class')
            };

        });
        return res.status(200).send(data);
    },

    async scrapingYoutube(req, res) {

        const browser = await puppeteer.launch({
            headless: false,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
        const page = await browser.newPage();
        await page.goto(
            `https://www.youtube.com/channel/UC_Fk7hHbl7vv_7K8tYqJd5A/videos`
        );
        await page.waitForSelector("div#contents");
        await page.waitForTimeout(0);

        const titles = await page.evaluate(function () {
            return Array.from(
                document.querySelectorAll("ytd-grid-video-renderer a#video-title")
            ).map((el) => ({
                title: el.getAttribute("title"),
                link: el.getAttribute("href").replace('/watch?v=', ''),
            }));
        });

        await browser.close();

        titles.reverse();
        titles.map(video => {
            let obj = { title: video.title, link: video.link };
            VideoController.autoStore(obj);
        });

        return res.status(200).send(titles);
    }

}