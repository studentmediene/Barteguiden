var path = require('path'),
    fs = require('fs');

exports.postImage = function(req, res){

    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function(fieldname, file, filename) {
        console.log('chillern med '+filename);
        fstream = fs.createWriteStream(__dirname+'/../uploads/'+filename);
        file.pipe(fstream);
        fstream.on('close', function() {
            res.json({path:'hva med nei.png'});
        });
    });
}

exports.getImages = function(req, res){
    res.sendfile(path.resolve('uploads/'));
}
