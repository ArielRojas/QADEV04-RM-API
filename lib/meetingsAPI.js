//get meetings
//Author Ariel Wagner Rojas
var request = require('superagent');
require('superagent-proxy')(request);

var config = require('../config/config.json');
var endPoints = require(config.path.endPoints);

var meetingsByIdEndPoint = config.url + endPoints.meetingsByIdEndPoint;
var servicesByIdEndPoint = config.url + endPoints.servicesByIdEndPoint;
var roomByIdEndPoint = config.url + endPoints.roomByIdEndPoint;
var tokenHeader = endPoints.tokenHeader;

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
		.get(meetingsByIdRoomEndPoint)
	.end(function(err, res){
		if(err){
			console.log('Error...' + JSON.stringify(err));
		}else{
			console.log('The meeting has been obtained...' + JSON.stringify(res.body));
		};
		callback(res);
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
		.get(servicesByIdEndPoint)
		.set(tokenHeader,'jwt ' + token)
	.end(function(err, res){
		if(err){
			console.log('Error...' + JSON.stringify(err));
		}
		callback(res);
	});
};

exports.getService = getService;

/**
 * This method helps to get the rooms, the paramenters that needs are:
 * @callback contains the function instance
 */
var getRooms = function(callback){
	request
		.get(roomByIdEndPoint)
	.end(function(err, res){
		if(err){
			console.log('Error...' + JSON.stringify(err));
		};
		callback(res);
	});
};

exports.getRooms = getRooms;

