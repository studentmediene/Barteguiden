var express = require('express');
var app = express();
var router = express.Router();

port = process.env.PORT || 8080;

app.get('/', function(req, res) {
    res.send("fuck u\nnigger");
});

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
        console.log(req.body.title);
    });


app.use('/api', router);

app.listen(port);
