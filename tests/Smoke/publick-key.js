//Smoke TC pgp public-key
//Miguel Angel Terceros Caballero

var expect = require('chai').expect;
//import libraries
var config = require('../../config/config.json');
var publicKey = require('../../lib/public-keyAPI');

describe('Smoke TC PGP public-key', function () {

	before(function (done) {
		this.timeout(config.timeOut);
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
		done();
	});	

	it('GET /PGP Public Key Refactor', function(done) {
		publicKey
			.getPgpPublicKeyAPI(function(res){				
				expect(res.status).to.equal(config.httpStatus.Ok);
				done();
			});
	});
});