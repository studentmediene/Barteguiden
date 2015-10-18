var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var router = require('./router.js');
var passport = require('passport');
var cors = require('cors')
var busboy = require('connect-busboy');
var jobs = require('./import/jobs');
var fixtures = require('./models/fixtures.js');

var WHITELIST = [
    'http://localhost:9000',
    /\.barteguiden\.no$/
];

app.use(bodyParser.json());
app.use(busboy());
app.use(passport.initialize());
app.use(cors({origin: WHITELIST}));

port = process.env.PORT || 4004;
mongoose.connect('mongodb://127.0.0.1:27018/eventdb');

app.use('/api', router);

app.listen(port, function() {
    console.log("Serving on port " + port);
    jobs.start();
    fixtures.addTestUsers();
});
