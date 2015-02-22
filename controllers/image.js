var path = require('path'),
    fs = require('fs');

exports.postImage = function(req, res){
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function(fieldname, file, filename) {
        filename = filename.replace(/\s/g, '');
        fstream = fs.createWriteStream(path.resolve('./uploads/'+filename));
        file.pipe(fstream);
        fstream.on('close', function() {
            var url = req.protocol + '://'+ req.host + req.originalUrl + filename;
            res.json({halla: url});
        });
    });
};

exports.getImages = function(req, res){
    // TODO: List all urls available
    res.sendfile(path.resolve('uploads/'));
};

// TODO: 
// exports.getImage = function(req, res){};
