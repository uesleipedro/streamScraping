require('dotenv').config();
const http = require('http');
const Scheduled = require('scheduled');

const app = require('./app.js');
const connectToDatabase = require("./database");
const scrap = require('./app/controller/scraping');

connectToDatabase();

const port = process.env.PORT || 3333;
const server = http.createServer(app);
server.listen(port);

// const myJob = new Scheduled({
//     id: "minuteTaskEven",
//     pattern: "*/1", 
//     task: function(){
//         scrap.apiYoutubeFetch;
//     }
// }).start();

module.exports = server;