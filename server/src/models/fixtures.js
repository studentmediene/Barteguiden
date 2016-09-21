/* eslint-disable import/prefer-default-export */
import User from '../models/User';

export function addTestUsers() {
    if (process.env.NODE_ENV === 'development') {
        User.find((err, users) => {
            if (err || users.length === 0) { // add test user if users is empty
                const user = new User({
                    username: 'test',
                    password: 'test',
                    role: 'admin',
                });
                user.save();
                console.log('Added test user!');
            }
        });
    }
}
