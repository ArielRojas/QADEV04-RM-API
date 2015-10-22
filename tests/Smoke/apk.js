//Smoke TC apk router
//Miguel Angel Terceros Caballero
//

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
			.getAPK(function(res){
				expect(res.status).to.equal(config.httpStatus.Ok);

				done();
			});
	});
});