//Smoke testing - GET Meetings
//Author Ariel Wagner Rojas
var init = require('../../init');
//with config it can use the methods located into the config file
var config = require(GLOBAL.initialDirectory+'/config/config.json');
var expect = require('chai').expect;
//with meetingsAPI it can use the methods located into the meetingsAPI file
//var meetingsAPI = require(GLOBAL.initialDirectory+config.path.meetingsAPI);
//with tokenAPI it can use the parameters located into the loginAPI file
var tokenAPI = require(GLOBAL.initialDirectory+config.path.tokenAPI);
var roomManagerAPI = require(GLOBAL.initialDirectory+config.path.roomManagerAPI);
var endPoint = require(GLOBAL.initialDirectory+config.path.endPoints);
var url = config.url;
var meetingsEndPoint = url + endPoint.meetings;
var servicesEndPoint = url + endPoint.services;
var roomsEndPoint = url + endPoint.rooms;
var rooms = endPoint.rooms;
var meetings = endPoint.meetings;
//global variables
//the token variable will contain the token
var token = null;
//the serviceId variable will contain the service id
var serviceId = null;
//the roomId variable will contain the room id
var roomId = null;

describe('Smoke testings for meetings', function () {
	
	this.timeout(config.timeOut);

	before('Getting the token ',function (done){
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
		//getting the token
		tokenAPI
			.getToken(function(err, res){
				token = res;
				done();
			});
	});

	beforeEach('Getting the service id and room id ',function (done){
		roomManagerAPI
				.getwithToken(token.body.token, servicesEndPoint, function(err, res1){
					serviceId = res1.body[0]._id;
				roomManagerAPI
					.get(roomsEndPoint, function(err, res2){
						roomId = res2.body[0]._id;
						done();
					});
				});
	});

	it('GET /services/{:serviceId}/rooms/{:roomId}/meetings returns 200', function (done){	
		roomManagerAPI
			.get(servicesEndPoint + '/' + serviceId + '/' + rooms + '/' + roomId + '/' + meetings, function(err, res){
				expect(res.status).to.equal(config.httpStatus.Ok);
				done();
			});
	});
});