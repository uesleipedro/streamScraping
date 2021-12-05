const mongoose = require("mongoose");

function connectToDatabase() {
    mongoose.connect(
        "mongodb+srv://ueslei:angra136@cluster0.p5iuj.mongodb.net/spacetoday?retryWrites=true&w=majority",
        // process.env.DATABASE_URL,
        //'mongodb://localhost:27017/spacetoday',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

    const db = mongoose.connection;
    db.on("error", (error) => console.log(error));
    db.once("open", () => console.log("Connected to Dadabase!"));
}

module.exports = connectToDatabase;