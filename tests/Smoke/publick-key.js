//Smoke TC pgp public-key
//Miguel Angel Terceros Caballero

var request = require('superagent');
require('superagent-proxy')(request);
var expect = require('chai').expect;
//import libraries
var config = require('../../config/config.json');
var pgp = require('../../lib/public-keyAPI');

describe('Smoke TC PGP public-key', function () {

	before(function (done) {
		this.timeout(config.timeOut);
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
		done();
	});	

	it('GET /PGP Public Key Refactor', function(done) {
		pgp
			.getPgpAPI(function(res){				
				expect(res.status).to.equal(config.httpStatus.Ok);
				done();
			});
	});
});