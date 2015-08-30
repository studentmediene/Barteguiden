var User = require('../models/User');

// POST /api/users
exports.postUser = function(req, res){
    var user = new User({
        username: req.body.username,
        password: req.body.password,
    });
    user.save(function(err){
        if (err)
            res.send(err);

        res.json({message: 'New user added.'});
    });
};

// GET /api/users/
exports.getUsers = function(req, res){
    User.find(function(err, users){
        if (err)
            res.send(err);

        res.json(users);
    });
};

// GET /api/users/:user_id
exports.getUser = function(req, res){
    User.findById(req.params.user_id, function(err, users){
        if (err)
            res.send(err);
        res.json(users);
    });
};

// PUT /api/users/:user_id
exports.putUser = function(req, res){
    User.update({_id:req.params.user_id},
                 function(err, raw){
                     if (err)
                         res.send(err);
                     res.json({message: 'Event updated.'});
                 });
};

// DELETE /api/users/:user_id
exports.deleteUser = function(req, res){
    User.remove({_id: req.params.user_id},
            function(err){
                if (err)
                    res.send(err);
                res.json({message: 'Event removed.'});
            });
};
