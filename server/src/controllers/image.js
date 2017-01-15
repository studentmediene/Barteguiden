import path from 'path';
import fs from 'fs';
import im from 'imagemagick-stream';

const FOLDERNAME = './uploads/';

const genFilename = () => {
    const n1 = Math.floor(Math.random() * 1e15);
    const n2 = Math.floor(Math.random() * 1e15);
    return `${n1.toString()}_${n2.toString()}`;
};

export const postImage = (req, res) => {
    let fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', (fieldname, file, filename) => {
        const fname = genFilename() + path.extname(filename);
        fstream = fs.createWriteStream(path.resolve(FOLDERNAME +
                    fname));
        const resize = im().resize('x350').quality('80');
        file.pipe(resize).pipe(fstream);
        fstream.on('close', () => {
            let url = path.join(req.get('host'),
                                req.originalUrl, fname);
            url = `${req.protocol}://${url}`;
            res.json({ url });
        });
    });
};

export const getImage = (req, res) => {
    let p = path.resolve(FOLDERNAME);
    p += `/${req.params['0']}`;
    res.sendFile(p);
};
