const express = require('express');
const AWS = require('aws-sdk');

if (process.env.AWS_SAM_LOCAL) {
  AWS.config.update({
    region: 'ap-southeast-2',
    endpoint: 'http://docker.for.mac.host.internal:8888',
  });
}

const app = express();
const table = 'apptable';
const params = {
  TableName: table,
};

app.get('/ping', (req, res) => res.status(200).send({ result: 'pong' }));
app.get('/test', (req, res) => {
  const dc = new AWS.DynamoDB.DocumentClient();
  dc
    .scan(params)
    .promise()
    .then(response => res.status(200).send(response))
    .catch(err => res.status(500).send(err));
});

module.exports = app;
