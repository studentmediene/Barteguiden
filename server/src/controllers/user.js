import User from '../models/User';

// POST /api/users
export const postUser = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });
    user.save((err) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'New user added.' });
    });
};

// GET /api/users/
export const getUsers = (req, res) => {
    User.find((err, users) => {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
};

// GET /api/users/:user_id
export const getUser = (req, res) => {
    User.findById(req.params.user_id, (err, users) => {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
};

// PUT /api/users/:user_id
export const putUser = (req, res) => {
    User.update({ _id: req.params.user_id },
                 (err) => {
                     if (err) {
                         res.send(err);
                     }
                     res.json({ message: 'Event updated.' });
                 });
};

// DELETE /api/users/:user_id
export const deleteUser = (req, res) => {
    User.remove({ _id: req.params.user_id },
            (err) => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Event removed.' });
            });
};
