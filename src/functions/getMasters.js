const AWS = require("aws-sdk");
const epsagon = require("epsagon");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.mastersTable;

epsagon.init({
  token: process.env.epsagonToken,
  appName: process.env.service,
  metadataOnly: false
});

module.exports.handler = epsagon.lambdaWrapper(async () => {
  const count = 8;

  const req = {
    TableName: tableName,
    Limit: count
  };

  const resp = await dynamodb.scan(req).promise();

  const res = {
    statusCode: 200,
    body: JSON.stringify(resp.Items)
  };

  return res;
});