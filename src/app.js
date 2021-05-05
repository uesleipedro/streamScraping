const express = require('express');
const app = express();

const scraping = require('./app/services/scraping');

app.get('/articles/:page', async (req, res, next) => {
    async function runAsync() {
        const page = req.params.page;
        var data = await scraping.scrape(page);
        return res.status(200).send({ data });
    }
    runAsync();
});

module.exports = app;
