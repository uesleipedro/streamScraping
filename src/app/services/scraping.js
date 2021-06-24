const cheerio = require("cheerio");
const axios = require("axios");

exports.scrape = async function (page) {
    var page = page == 1 ? '' : 'page/' + page + '/';

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
    return data;
}

exports.newsnow = async function (page) {
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
        if ( i >= lastItem) return false;

    });
    return data;
}