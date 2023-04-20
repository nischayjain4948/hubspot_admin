
const express = require("express");
const app = express();
const db = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const cors = require("cors");
const cron = require("./config/cron");


// middleware

try {
    app.use(express.json());
    app.use(cors());

    app.use(express.urlencoded({ extended: true }));
    db();

    app.use("/api", adminRoutes);
    cron.refreshTokenCron();








    app.listen(8080, () => {
        console.log(`Server is running on PORT ${8080}`);

    })
}
catch (error) {
    console.log("Error", error);
}
