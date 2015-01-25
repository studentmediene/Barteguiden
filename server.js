var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var router = express.Router();
var passport = require('passport');
var eventController = require('./controllers/event');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');
var auth = authController.isAuthenticated;



app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(passport.initialize());

port = process.env.PORT || 8000;
mongoose.connect('mongodb://127.0.0.1:27017/eventdb');

router.route('/events')
    .post(auth, eventController.postEvents)
    .get(eventController.getEvents);

router.route('/events/:event_id')
    .get(eventController.getEvent)
    .put(auth, eventController.putEvent)
    .delete(auth, eventController.deleteEvent);

router.route('/users')
    .post(auth, userController.postUser)
    .get(auth, userController.getUsers);

router.route('/users/:user_id')
    .put(auth, userController.putUser)
    .get(auth, userController.getUser)
    .delete(auth, userController.deleteUser);
    

app.use('/api', router);

console.log("Serving on port " + port);
app.listen(port);
