var path = require('path'),
    fs = require('fs');

var FOLDERNAME = './uploads/'

function genFilename() {
    var n1 = Math.floor(Math.random() * 1e15);
    var n2 = Math.floor(Math.random() * 1e15);
    return n1.toString() + '_' + n2.toString();
}

exports.postImage = function(req, res){
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function(fieldname, file, filename) {
        filename = genFilename();
        fstream = fs.createWriteStream(path.resolve(FOLDERNAME+filename));
        file.pipe(fstream);
        fstream.on('close', function() {
            var port = req.app.settings.port || '';
            var url = path.join(req.get('host'),
                                req.originalUrl, filename);
            url = req.protocol + '://' + url;
            res.json({url: url});
        });
    });
};

exports.getImage = function(req, res){
    var p = path.resolve(FOLDERNAME);
    p += '/' + req.params['0'];
    res.sendFile(p);
};
