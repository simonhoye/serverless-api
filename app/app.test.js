const supertest = require("supertest");
const app = require("./app");

const request = supertest(app);

describe('GET /ping', () => {
    it('should return pong', done => {
      request
        .get('/ping')
        .expect('content-type', 'application/json; charset=utf-8')
        .expect(200, {result: 'pong'}, done);
    });
});