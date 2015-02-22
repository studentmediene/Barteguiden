var path = require('path'),
    fs = require('fs');

exports.postImage = function(req, res){

    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function(fieldname, file, filename) {
        fstream = fs.createWriteStream(path.resolve('./uploads/'+filename));
        file.pipe(fstream);
        fstream.on('close', function() {
            // TODO: return file url.
            res.json({path:'hva med nei.png'});
        });
    });
};

exports.getImages = function(req, res){
    // TODO: List all urls available
    res.sendfile(path.resolve('uploads/'));
};

// TODO: 
// exports.getImage = function(req, res){};
