const cheerio = require("cheerio");
const axios = require("axios");

exports.scrape = async function (){
    //async function  {
    const html = await axios.get('https://spacetoday.com.br/category/cosmologia/');
    const $ = await cheerio.load(html.data);
    let data = [];

    $('article.vlog-post').each((i, elem) => {
        var link = $(this);
        data.push({
            id: $(elem).find('div.entry-image a').attr('data-id'),
            title: $(elem).find('div.entry-image a').attr('title'),
            link: $(elem).find('div.entry-image > a').attr('href'),
            image: $(elem).find('div.entry-image > a > img').attr('src')
        });

    });
    console.log(data);
    return data;
}

// run();

//pagination=>> https://spacetoday.com.br/category/cosmologia/page/2/