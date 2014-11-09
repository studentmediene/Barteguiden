var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var express = require('express');
var app = express();
var router = express.Router();

var eventController = require('./controllers/event');


app.use(bodyParser.urlencoded({
    extended: true
}));

port = process.env.PORT || 8000;
mongoose.connect('mongodb://127.0.0.1:27017/eventdb');

router.route('/events')
    .post(eventController.postEvents)
    .get(eventController.getEvents);

router.route('/events/:event_id')
    .get(eventController.getEvent);


app.use('/api', router);

app.listen(port);
