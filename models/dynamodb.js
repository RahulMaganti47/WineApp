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
        id: Joi.string(),
        location: Joi.array(),
        temperature: Joi.array(),
        humidity: Joi.array(),
        light: Joi.array(),
    }
});

var id_exists = function(id, route_callbck) {
    Device.get(id, function(err, acc) {
        if (acc) {
            console.log("The identification code is " + id);
            route_callbck(true);
        } else {
            console.log("The identification code was not found");
            route_callbck(false);
        }
    });
}


var dynamodb = {
    idExists : id_exists,
};

module.exports = dynamodb;