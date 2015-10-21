//get meetings
//Author Ariel Wagner Rojas
var request = require('superagent');
require('superagent-proxy')(request);

var config = require('../config/config.json');
var endPoint = require(config.path.endPoints);

var url = config.url;
var meetingsByIdEndPoint = endPoint.meetingsByIdEndPoint;
var servicesByIdEndPoint = endPoint.servicesByIdEndPoint;
var roomByIdEndPoint = endPoint.roomByIdEndPoint;
var tokenHeader = config.tokenHeader;

/**
 * This method helps to get the meetings, the paramenters that needs are:
 * @serviceId {string}, this parameter contains the service id
 * @roomId {string} is a parameters that contains the room id
 * @callback contains the function instance  
 */
var getMeetings = function(serviceId,roomId,callback){
	var meetingsByIdRoomEndPoint = meetingsByIdEndPoint.replace('{:serviceId}', serviceId);
	var meetingsByIdRoomEndPoint = meetingsByIdRoomEndPoint.replace('{:roomId}', roomId);
	console.log('GET ' + meetingsByIdRoomEndPoint);
	request
		.get(url + meetingsByIdRoomEndPoint)
	.end(function(err, res){
		if(err){
			console.log('Error...' + JSON.stringify(err));
		}else{
			console.log('The meeting has been obtained...' + JSON.stringify(res.body));
		};
		callback(err, res);
	});
};

exports.getMeetings = getMeetings;

/**
 * This method helps to get the service, the paramenters that needs are:
 * @token {number}, this parameter contains the token for have access to service
 * @callback contains the function instance  
 */
var getService = function(token,callback){
	request
		.get(url + servicesByIdEndPoint)
		.set(tokenHeader, config.tokenPrefix + token)
	.end(function(err, res){
		if(err){
			console.log('Error...' + JSON.stringify(err));
		}
		callback(err, res);
	});
};

exports.getService = getService;

/**
 * This method helps to get the rooms, the paramenters that needs are:
 * @callback contains the function instance
 */
var getRooms = function(callback){
	request
		.get(url + roomByIdEndPoint)
	.end(function(err, res){
		if(err){
			console.log('Error...' + JSON.stringify(err));
		};
		callback(err, res);
	});
};

exports.getRooms = getRooms;

