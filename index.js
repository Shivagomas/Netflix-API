const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors')
const winston = require('winston');

const movies = require("./routes/movie");
const category = require("./routes/category");
const home = require('./routes/home');
const users = require('./routes/users');
const auth = require("./routes/auth");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.use("/", home);
app.use("/api/category", category);
app.use("/api/movies", movies);
app.use("/api/users",users);
app.use("/api/auth",auth);

if(!config.get("jwtPrivateKey")) {
    console.log("FATAL ERROR: jwtPrivateKey is not defined")
    process.exit(1);
}

process.on('uncaughtException', (ex) => {
    winston.error(ex.message, ex);
    process.exit(1);
});

process.on('unhandledRejection', (ex) => {
    winston.error(ex.message, ex);
    process.exit(1);
});

winston.add(new winston.transports.File({ filename: 'logfile.log\n'}));

const db = config.get("db");
mongoose.connect(db)
    .then(() => console.log(`connecting to ${db}`))
    .catch(err => console.log(err.message));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Connecting to ${port}`))
