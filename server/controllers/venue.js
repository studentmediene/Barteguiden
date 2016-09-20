import Venue from '../models/Venue';

// POST /api/venues
export const postVenues = (req, res) => {
    const venue = new Venue(req.body);

    venue.save((err) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Venue added.', data: venue });
    });
};

// GET /api/venues
export const getVenues = (req, res) => {
    Venue.find((err, venues) => {
        if (err) {
            res.send(err);
        }
        res.json(venues);
    });
};

// GET /api/venues/:venue_id
export const getVenue = (req, res) => {
    Venue.findById(req.params.venue_id, (err, venue) => {
        if (err) {
            res.send(err);
        }
        res.json(venue);
    });
};

// PUT /api/venues/:venue_id
export const putVenue = (req, res) => {
    Venue.update({ _id: req.params.venue_id },
        req.body,
        (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Venue updated.' });
        });
};

// DELETE /api/venues/:venue_id
export const deleteVenue = (req, res) => {
    Venue.remove({ _id: req.params.venue_id },
        (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Venue removed.' });
        });
};
