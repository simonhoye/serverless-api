const express = require('express');
const AWS = require('aws-sdk');

process.env.AWS_SAM_LOCAL && AWS.config.update({
 region: "ap-southeast-2",
 endpoint: "http://docker.for.mac.host.internal:8888"
});

const dc = new AWS.DynamoDB.DocumentClient();
const app = express();
const table = "apptable";

app.get("/test", (req, res) => {
  let params = {
    TableName: table
  };
  dc
    .scan(params)
    .promise()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});
app.get("/ping", (req, res) => {
  res.status(200).send({result: 'pong'});
});
module.exports = app;