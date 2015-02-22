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
            var port = req.app.settings.port || '';
            var url = path.join(req.get('host'),
                                req.originalUrl, filename);
            url = req.protocol + '://' + url;
            res.json({halla: url});
        });
    });
};

exports.getImages = function(req, res){
    // TODO: List all urls available
};

// TODO: 
exports.getImage = function(req, res){
    var p = path.resolve('./uploads/');
    p += '/' + req.params['0'];
    res.sendFile(p);
};
