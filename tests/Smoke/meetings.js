//Smoke testing - GET Meetings
//Author Ariel Wagner Rojas
// the next line call the file init.js to declare a global var(GLOBAL.initialDirectory)
var init = require('../../init');
//with config it can use the methods located into the config file
var config = require(GLOBAL.initialDirectory+'/config/config.json');
var expect = require('chai').expect;
//with tokenAPI it can use the parameters located into the loginAPI file
var tokenAPI = require(GLOBAL.initialDirectory+config.path.tokenAPI);
var roomManagerAPI = require(GLOBAL.initialDirectory+config.path.roomManagerAPI);
var endPoint = require(GLOBAL.initialDirectory+config.path.endPoints);
var meetingConfig = require(GLOBAL.initialDirectory+config.path.meetingConfig);
//EndPoints
var url = config.url;
var meetingsEndPoint = url + endPoint.meetings;
var servicesEndPoint = url + endPoint.services;
var roomsEndPoint = url + endPoint.rooms;
var rooms = endPoint.rooms;
var meetings = endPoint.meetings;
var basic = config.userBasicAccountJson;
//global variables
//the token variable will contain the token
var token = null;
//the serviceId variable will contain the service id
var serviceId = null;
//the roomId variable will contain the room id
var roomId = null;
//the meetingId variable will contain the meeting id
var meetingId = null;

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
	/*
	after('Deleting the meeting ' + function (done) {
		roomManagerAPI
			.delwithTokenBasic(basic, servicesEndPoint + '/' + serviceId + '/' + rooms + '/' + roomId + '/' + meetings + '/' + meetingId, function(err, res){
				done();
			});
	});*/
	
	it('GET /services/{:serviceId}/rooms/{:roomId}/meetings returns 200', function (done){	
		roomManagerAPI
			.get(servicesEndPoint + '/' + serviceId + '/' + rooms + '/' + roomId + '/' + meetings, function(err, res){
				expect(res.status).to.equal(config.httpStatus.Ok);
				done();
			});
	});

	it('POST /services/{:serviceId}/rooms/{:roomId}/meetings returns 200', function (done){	
		var meetingJSon = meetingConfig.meetingJSon;
		meetingJSon.start = "2015-10-28T20:00:00.000Z";
		meetingJSon.end = "2015-10-28T20:10:00.000Z";
		roomManagerAPI
			.postwithBasic(basic, servicesEndPoint + '/' + serviceId + '/' + rooms + '/' + roomId + '/' + meetings, meetingJSon, function(err, res){
				meetingId = res.body._id;
				expect(res.status).to.equal(config.httpStatus.Ok);
				done();
			});
	});

	it('GET /services/{:serviceId}/rooms/{:roomId}/meetings/{:meetingId} returns 200', function (done){	
		roomManagerAPI
			.get(servicesEndPoint + '/' + serviceId + '/' + rooms + '/' + roomId + '/' + meetings + '/' + meetingId, function(err, res){
				expect(res.status).to.equal(config.httpStatus.Ok);
				done();
			});
	});

	it('PUT /services/{:serviceId}/rooms/{:roomId}/meetings/{:meetingId} returns 200', function (done){	
		var meetingPutJSon = meetingConfig.meetingPutJSon;
		roomManagerAPI
			.putwithBasic(basic, servicesEndPoint + '/' + serviceId + '/' + rooms + '/' + roomId + '/' + meetings + '/' + meetingId, meetingPutJSon, function(err, res){
				expect(res.status).to.equal(config.httpStatus.Ok);
				done();
			});
	});	
});

describe('Smoke testings for meetings DELETE Method', function () {
	
	this.timeout(config.timeOut);

	before('Getting the basic authentication ',function (done){
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
		var meetingJSon = meetingConfig.meetingJSon;
		meetingJSon.start = "2015-10-28T20:21:00.000Z";
		meetingJSon.end = "2015-10-28T20:30:00.000Z";
		tokenAPI
			.getToken(function(err, res){
				token = res;
				roomManagerAPI
					.getwithToken(token.body.token, servicesEndPoint, function(err, res1){
						serviceId = res1.body[0]._id;
						roomManagerAPI
							.get(roomsEndPoint, function(err, res2){
								roomId = res2.body[0]._id;
								roomManagerAPI
									.postwithBasic(basic, servicesEndPoint + '/' + serviceId + '/' + rooms + '/' + roomId + '/' + meetings, meetingJSon, function(err, res){
										meetingId = res.body._id;
										done();
									});
							});
					});
			});
	});

	it('DELETE /services/{:serviceId}/rooms/{:roomId}/meetings/{:meetingId} returns 200', function (done) {
		roomManagerAPI
			.delwithBasic(basic, servicesEndPoint + '/' + serviceId + '/' + rooms + '/' + roomId + '/' + meetings + '/' + meetingId, function(err, res){
				expect(res.status).to.equal(config.httpStatus.Ok);
				done();
			});
	});
});
