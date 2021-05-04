const express = require('express');
const app = express();

const scraping = require('./scraping');

async function run() {
    var data = await scraping.scrape();

    app.get('/', function (req, res) {
        return res.status(200).send({ data });
    });

}

run();

app.listen(3332);