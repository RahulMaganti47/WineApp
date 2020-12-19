var dynamo = require('dynamodb');
var Joi = require('joi');
var AWS = require("aws-sdk");
var async = require("async"); //require async for use

dynamo.AWS.config.update({
    accessKeyId: 'AKIAJQ7CHJP4W7TMTISA',
    secretAccessKey: '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',
    region: "us-east-1",
});

var Device = dynamo.define('Device', {

    hashKey: 'id',
    timestamps: true,

    schema: {
        id: dynamo.types.uuid(),
        location: dynamo.types.stringSet(),
        temperature: dynamo.types.stringSet(),
        humidity: dynamo.types.stringSet(),
        light: dynamo.types.stringSet(),
    }
});

var dynamodb = {

};

module.exports = dynamodb;