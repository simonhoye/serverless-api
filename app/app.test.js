const AWS = require('aws-sdk-mock');
const supertest = require('supertest');
const app = require('./app');

const request = supertest(app);

describe('GET /ping', () => {
  it('should return successfully with pong', (done) => {
    request
      .get('/ping')
      .expect('content-type', 'application/json; charset=utf-8')
      .expect(200, { result: 'pong' }, done);
  });
});
describe('GET /test', () => {
  it('should return successfully with the DynamoDB response', (done) => {
    const mockResponse = { Items: [], Count: 0, ScannedCount: 0 };
    AWS.mock('DynamoDB.DocumentClient', 'scan', (
      params,
      callback,
    ) => {
      callback(null, mockResponse);
    });
    request
      .get('/test')
      .expect('content-type', 'application/json; charset=utf-8')
      .expect(200, mockResponse, done);
  });
  it('should return an error', (done) => {
    request
      .get('/test')
      .expect('content-type', 'application/json; charset=utf-8')
      .expect(500, done);
  });
  afterEach(() => AWS.restore());
});
