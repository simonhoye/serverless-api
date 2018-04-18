const express = require('express');
const AWS = require('aws-sdk');

AWS.config.update({
  region: "ap-southeast-2",
  endpoint: "http://10.0.1.191:8888"
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
module.exports = app;