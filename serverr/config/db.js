const mongoose = require("mongoose");
const connectDb = async () => {

    mongoose.connect("mongodb+srv://Nischay:Nischay@crudd.qoju4.mongodb.net/hubspot?retryWrites=true&w=majority", { useNewUrlParser: true }, { useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function () {
        console.log(`MongoDB Connected.....`);
    });
};
module.exports = connectDb;