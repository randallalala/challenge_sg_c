const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const server = express();

const passport = require("./config/passportConfig");
const session = require("express-session");
const flash = require("connect-flash");
const signinBlocker = require("./config/signinBlocker");

require("dotenv").config();

/*
Connect to MongoDB
*/
// mongoose.set('useCreateIndex', true); // deprecated error
mongoose.connect(
    process.env.MONGODBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    },
    () => {
        console.log("MongoDB connected!")
    }
);

server.use(express.static("public"));
server.use(express.urlencoded({
    extended: true
}));
server.set("view engine", "ejs");
server.use(expressLayouts);

/*-- These must be place in the correct place */
server.use(
    session({
        secret: process.env.SECRET,
        saveUninitialized: true,
        resave: false,
        cookie: {
            maxAge: 360000
        },
    })
);

//-- passport initialization
server.use(passport.initialize());
server.use(passport.session());
server.use(flash());

server.use(function (request, response, next) {
    // before every route, attach the flash messages and current user to res.locals
    response.locals.alerts = request.flash();
    response.locals.currentUser = request.user;
    next();
});

// routes
server.use("/auth", require("./routes/auth.route"));
server.use("/", require("./routes/admin.route"));
server.use("/senior", require("./routes/senior.route"));
server.use("/helper", require("./routes/helper.route"));


server.listen(process.env.PORT, () => {
    console.log(`connected to express on PORT ${process.env.PORT}`)
});