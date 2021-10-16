require('dotenv').config();
const http = require('http');

const app = require('./app.js');
const connectToDatabase = require("./database");

connectToDatabase();

const port = process.env.PORT || 3333;
const server = http.createServer(app);
server.listen(port);

// const myJob = new Scheduled({
//     id: "minuteTaskEven",
//     pattern: "*/1", 
//     task: function(){
//         VideoController.scrapingYoutube;
//     }
// }).start();

module.exports = server;