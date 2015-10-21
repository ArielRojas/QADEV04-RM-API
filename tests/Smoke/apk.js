//Smoke TC apk router
//Miguel Angel Terceros Caballero

var request = require('superagent');
require('superagent-proxy')(request);
var expect = require('chai').expect;
//import libraries
var config = require('../../config/config.json');
var apkAPI = require('../../lib/apkAPI');

describe('APK Routers', function () {

	before(function (done) {
		this.timeout(config.timeOut);
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
		done();
	});	

	it('GET /apk refactor', function(done) {
		apkAPI
			.getAPK(function(err, res){
				if(err){
					console.log(res.body.code);
					console.log(res.body.message);
				}
				
				expect(res.status).to.equal(config.httpStatus.Ok);

				done();
			});
	});
});