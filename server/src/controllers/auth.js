import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import User from '../models/User';

passport.use(new BasicStrategy(
    (username, password, callback) => {
        User.findOne({ username }, (findErr, user) => {
            if (findErr) {
                return callback(findErr);
            }
            if (!user) {
                return callback(null, false);
            }
            user.verifyPassword(password, (verErr, isMatch) => {
                if (verErr) {
                    return callback(verErr);
                }
                if (!isMatch) {
                    return callback(null, false);
                }
                return callback(null, user);
            });
            return callback('Something went wrong');
        });
    }
));

export const isAuthenticated = passport.authenticate('basic', { session: false });

export const login = (req, res) => {
    res.send();
};
