const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const scraping = require('./app/controller/scraping');
const VideoController = require("./app/controller/VideoController");
const ConfiguracoesController = require('./app/controller/ConfiguracoesController');
const LaunchController = require('./app/controller/LaunchController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methos', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();
});

app.use('/articles/:page', scraping.scrape);
app.use('/externalArticles/:page', scraping.newsnow);
app.use('/post/:page', scraping.post);
app.use('/youtube', scraping.scrapingYoutube);
app.use('/videos/:page', VideoController.index);
app.use('/configuracoes/:value', ConfiguracoesController.index);
app.use('/fetchYoutube', scraping.apiYoutubeFetch);

app.use('/fetchLaunchs', LaunchController.store);
app.use('/getLaunchs/:page', LaunchController.index);
app.use('/ip', function () {
    const ipCliente = req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    return response.status(200).send({ ipCliente });
});


module.exports = app;
