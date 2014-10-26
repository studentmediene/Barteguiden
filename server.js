var mongoose = require('mongoose');
var Event = require('./models/Event.js');

var bodyParser = require('body-parser');

var express = require('express');
var app = express();
var router = express.Router();


app.use(bodyParser.urlencoded({
    extended: true
}));

port = process.env.PORT || 8000;
mongoose.connect('mongodb://127.0.0.1:27017/eventdb');

router.use(function(req, res, next) {
    console.log('Got request.');
    next();
});

router.get('/', function(req, res) {
    res.json([{
        message: 'fucku node er homp'
    }, {
        message: 'shit ass cunt'
    }]);
});

router.route('/events')
    .post(function(req, res) {
        var evnt = Event();
        evnt.title = req.body.title;
        evnt.description = req.body.desc;

        evnt.save(function(err){
            if(err)
                res.rend(err);
            res.json({ message: 'Event added.', data: evnt });
        });
    });


app.use('/api', router);

app.listen(port);
