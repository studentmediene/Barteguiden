/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import test from 'ava';
import request from 'supertest-as-promised';
import app from '../src/server.js';

test('Can get events', (t) => {
    request(app).get('/api/events')
        .expect(200)
        .then((res) => {
            t.is(Array.isArray(res.body), true);
        });
});
