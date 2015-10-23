//CRUD TC apk router
//Miguel Angel Terceros Caballero

var expect = require('chai').expect;
//import libraries
var init = require('../../init');
var config = require(GLOBAL.initialDirectory+'/config/config.json');
var endPoints = require(GLOBAL.initialDirectory+config.path.endPoints);
var roomManagerAPI = require(GLOBAL.initialDirectory+config.path.roomManagerAPI);

//url 
var apkEndPoint = config.url + endPoints.apk;

describe('CRUD TCs of APK Routers', function () {
	before(function (done) {
		this.timeout(config.timeOut);
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
		done();
	});	

	it('verify that the service not exists', function(done) {
		var code = "ResourceNotFound";
		var message = "/apk does not exist";
		roomManagerAPI
			.get(apkEndPoint, function(err, res){							
				expect(code).to.equal(res.body.code);
				expect(message).to.equal(res.body.message);

				done();
			});
	});
});