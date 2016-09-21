import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import express from 'express';
import passport from 'passport';
import cors from 'cors';
import busboy from 'connect-busboy';
import router from './router.js';
import jobs from './import/jobs';
import { addTestUsers } from './models/fixtures.js';

const app = express();

const WHITELIST = [
    'http://localhost:9000',
    /\.barteguiden\.no$/,
];

app.use(bodyParser.json());
app.use(busboy());
app.use(passport.initialize());
app.use(cors({ origin: WHITELIST }));

const port = process.env.PORT || 4004;
mongoose.connect('mongodb://127.0.0.1:27018/eventdb');

app.use('/api', router);

app.listen(port, () => {
    console.log(`Serving on port ${port}`);
    jobs.start();
    addTestUsers();
});
