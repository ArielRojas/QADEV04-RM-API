//Smoke testing - POST Authentication
//Author Ariel Wagner Rojas
var request = require('superagent');
require('superagent-proxy')(request);
var expect = require('chai').expect;
//with config it can use the parameters located into the config file
var config = require('../../config/config.json');
//with tokenAPI it can use the methods located into the tokenAPI file
var tokenAPI = require(config.path.tokenAPI);


describe('Smoke testing for Authentication (token)', function () {

	this.timeout(config.timeOut);

	before('Setting for obtain the token', function(){
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
    });

	it('POST /Authentication/login (local) with valid authentication',function (done){
		tokenAPI
		.getToken(function(err, token){
			expect(token.status).to.equal(config.httpStatus.Ok);
			expect(token.body.token).not.to.be.null;
			done();
		});
	});
});