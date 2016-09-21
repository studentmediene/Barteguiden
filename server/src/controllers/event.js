import _ from 'lodash';
import moment from 'moment';
import Event from '../models/Event';

// POST /api/events
export const postEvents = (req, res) => {
    const evnt = new Event(req.body);

    evnt.save((err) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Event added.', data: evnt });
    });
};

// GET /api/events
export const getEvents = (req, res) => {
    const time = moment().subtract(6, 'hours').valueOf();
    const findEvents = Event.find().where('startAt').gt(time);

    if (req.query.published === 'all') {
        findEvents
            .exec((err, events) => {
                if (err) {
                    res.send(err);
                }
                res.json(events);
            });
    } else {
        findEvents
            .where('isPublished').equals(true)
            .exec((err, events) => {
                if (err) {
                    res.send(err);
                }
                res.json(events);
            });
    }
};

// GET /api/events/:event_id
export const getEvent = (req, res) => {
    Event.findById(req.params.event_id, (err, evnt) => {
        if (err) {
            res.send(err);
        }
        res.json(evnt);
    });
};

// PUT /api/events/:event_id
export const putEvent = (req, res) => {
    Event.update({ _id: req.params.event_id },
                  req.body,
         (err) => {
             if (err) {
                 res.send(err);
             }
             res.json({ message: 'Event updated.' });
         });
};

// DELETE /api/events/:event_id
export const deleteEvent = (req, res) => {
    Event.remove({ _id: req.params.event_id },
        (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Event removed.' });
        });
};

// GET /api/v1/events
export const oldEvents = (req, res) => {
    const time = new Date().getTime();
    Event.find()
      .where('startAt').gt(time)
      .exec((err, events) => {
          if (err) {
              res.send(err);
          }
          const eventsOld =
              _.map(events, evt => ({
                  eventID: evt._id,
                  title: evt.title,
                  startAt: evt.startAt,
                  placeName: evt.venue.name,
                  address: evt.venue.address,
                  latitude: evt.venue.latitude,
                  longitude: evt.venue.longitude,
                  ageLimit: evt.ageLimit,
                  price: evt.price,
                  categoryID: evt.category,
                  descriptions: [{
                      language: 'nb',
                      text: Boolean(evt.description) ? evt.description.replace(/\s+/g, ' ')
                        : '',
                  }],
                  isRecommended: evt.isPromoted || false,
                  imageURL: evt.imageUrl,
                  eventURL: evt.eventUrl,
              }));
          res.json({
              events: eventsOld,
          });
      });
};
