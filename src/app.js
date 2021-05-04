const express = require('express');
const app = express();

const scraping = require('./app/services/scraping');

app.get('/articles', async (req, res, next) => {
    async function runAsync() {
        var data = await scraping.scrape('');
        return res.status(200).send({ data });
    }
    runAsync();
});

app.get('/articles/:number', async (req, res, next) => {
    async function runAsync() {
        const number = req.params.number;
        var data = await scraping.scrape('/page/'+number);
        return res.status(200).send({ data });
    }
    runAsync();
});

module.exports = app;
