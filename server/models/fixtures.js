var User = require('../models/User');

exports.addTestUsers = function() {
    if(process.env.NODE_ENV === 'development') {
        User.find(function(err, users) {
            if(err || users.length === 0) { // add test user if users is empty
                var user = new User({
                    username: 'test',
                    password: 'test',
                    role: 'admin'
                });
                user.save();
                console.log("Added test user!");
            }
        })
    }
};
