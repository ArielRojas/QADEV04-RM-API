var request = require('superagent');
require('superagent-proxy')(request);

var expect = require('chai').expect;
//with meetingsAPI it can use the methods located into the meetingsAPI file
var meetingsAPI = require('../../lib/meetingsAPI');
//with tokenAPI it can use the parameters located into the loginAPI file
var stTokenAPI = require('../../lib/loginAPI');
//with config it can use the methods located into the config file
var config = require('../../config/config.json');

describe('Smoke testings for meetings', function () {

	//global variables
	var userCredential = config.userCredential;
	//the tk variable will contain the token
	var tk = null;
	//the serviceId variable will contain the service id
	var serviceId = null;
	//the tk variable will contain the room id
	var roomId = null;

	config.timeout;
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = config.NODE_TLS_REJECT_UNAUTHORIZED;

	before('Getting the token ',function (done){
		stTokenAPI
			.getToken(userCredential,function(res){
				tk = res;
				done();
			});
	});

	beforeEach('Getting the service id and room id ',function (done){
		meetingsAPI
				.getService(tk.body.token, function(res1){
					serviceId = res1.body[0]._id;
				meetingsAPI
					.getRooms(function(res2){
						roomId = res2.body[0]._id;
						done();
					});
				});
	});

	it('GET /services/{serviceId}/rooms/{roomId}/meetings returns 200',function (done){	
		meetingsAPI
			.getMeetings(serviceId,roomId,function(res){
				expect(res.status).to.equal(200);
				done();
		});
	});
});