var dynamo = require('dynamodb');
var Joi = require('joi');
var async = require('async');
var fs = require('fs');
var AWS = require("aws-sdk");
dynamo.AWS.config.update({
  accessKeyId: 'AKIAJQ7CHJP4W7TMTISA',
  secretAccessKey: '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',
  region: "us-east-1"
});

var allData = JSON.parse(fs.readFileSync('tableloaderitems.json', 'utf8'));

var Device = dynamo.define('Device', {

  hashKey: 'id',
  timestamps: true,

  schema: {
    id: Joi.string(),
    location: Joi.array(),
    temperature: Joi.array(),
    humidity: Joi.array(),
    light: Joi.array(),
  }
});

dynamo.createTables(function (err) {
  if (err) {
    console.log('Error creating tables: ', err);
  } else {
    console.log('Tables have been created');
  }
});

var params = {
  "humidity": ["50", "51", "44", "60", "65", "70"],

  "light": ["10", "200", "40", "1", "5", "6"],

  "location": ["38.35304490086393, -122.57911017630805", "36.491434736382566, -115.86614894476571", "36.47770939666654, -105.41873264041492", "37.319289778881235, -91.54771160701955", "38.528390974525124, -79.95141343812686", "39.927855100037554, -75.24221775410935"],

  "temperature": ["60", "61", "68", "72", "60", "55"],

  "id": "0000"
};
post();

function post() {
  Device.create(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  })
}