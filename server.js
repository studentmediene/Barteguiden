var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var router = express.Router();
var passport = require('passport');
var eventController = require('./controllers/event');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');
var imageController = require('./controllers/image');
var auth = authController.isAuthenticated;
var cors = require('cors')
var busboy = require('connect-busboy');


app.use(bodyParser.json());
app.use(busboy());
app.use(passport.initialize());
app.use(cors({origin: 'http://localhost:9000'}));

port = process.env.PORT || 4004;
mongoose.connect('mongodb://127.0.0.1:27018/eventdb');

router.route('/events')
    .post(eventController.postEvents)
    .get(eventController.getEvents);

router.route('/events/:event_id')
    .get(eventController.getEvent)
    .put(eventController.putEvent)
    .delete(eventController.deleteEvent);

router.route('/users')
    .post(auth, userController.postUser)
    .get(auth, userController.getUsers);

router.route('/users/:user_id')
    .put(auth, userController.putUser)
    .get(auth, userController.getUser)
    .delete(auth, userController.deleteUser);

router.route('/image')
    .post(imageController.postImage)
    .get(imageController.getImages);

app.use('/api', router);

console.log("Serving on port " + port);
app.listen(port);
