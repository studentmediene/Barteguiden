var express = require('express');
var router = express.Router();
var eventController = require('./controllers/event');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');
var imageController = require('./controllers/image');
var venueController = require('./controllers/venue');
var auth = authController.isAuthenticated;

router.route('/events')
    .post(eventController.postEvents)
    .get(eventController.getEvents);

router.route('/events/:event_id')
    .get(eventController.getEvent)
    .put(eventController.putEvent)
    .delete(eventController.deleteEvent);

router.route('/v1/events')
    .get(eventController.oldEvents);

router.route('/users')
    .post(auth, userController.postUser)
    .get(auth, userController.getUsers);

router.route('/users/:user_id')
    .put(auth, userController.putUser)
    .get(auth, userController.getUser)
    .delete(auth, userController.deleteUser);

router.route('/images')
    .post(imageController.postImage);

router.route('/images/*')
    .get(imageController.getImage);

router.route('/venues/:venue_id')
  .get(venueController.getVenue)
  .put(venueController.putVenue)
  .delete(venueController.deleteVenue);

module.exports = router;

