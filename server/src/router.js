import express from 'express';
import { postEvents, getEvent, getEvents,
  putEvent, deleteEvent, oldEvents } from './controllers/event';
import { postUser, getUser, putUser, deleteUser, getUsers } from './controllers/user';
import { isAuthenticated, login } from './controllers/auth';
import { postImage, getImage } from './controllers/image';
import { postVenues, getVenues, getVenue,
  putVenue, deleteVenue } from './controllers/venue';

const auth = isAuthenticated;
const router = express.Router();


router.route('/events')
    .post(auth, postEvents)
    .get(getEvents);

router.route('/events/:event_id')
    .get(getEvent)
    .put(auth, putEvent)
    .delete(auth, deleteEvent);

router.route('/v1/events')
    .get(oldEvents);

router.route('/users')
    .post(auth, postUser)
    .get(auth, getUsers);

router.route('/users/:user_id')
    .put(auth, putUser)
    .get(auth, getUser)
    .delete(auth, deleteUser);

router.route('/images')
    .post(auth, postImage);

router.route('/images/*')
    .get(getImage);

router.route('/venues')
  .post(postVenues)
  .get(getVenues);

router.route('/venues/:venue_id')
  .get(getVenue)
  .put(putVenue)
  .delete(deleteVenue);

router.route('/login', getUser)
    .get(auth, login);

export default router;
