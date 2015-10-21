var request = require('superagent');
require('superagent-proxy')(request);

var expect = require('chai').expect;
//with tokenAPI it can use the parameters located into the loginAPI file
var tokenAPI = require('../../lib/loginAPI');
//with config it can use the methods located into the config file
var config = require('../../config/config.json');

describe('Smoke testing for Authentication (token)', function () {

	//global variable
	var userCredential = config.userCredential;

	config.timeout;

	before('Setting for obtain the token', function(){
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = config.NODE_TLS_REJECT_UNAUTHORIZED;
    });

	it('POST /Authentication/login (local) with valid authentication',function (done){
		tokenAPI
		.getToken(userCredential, function(token){
			expect(token.status).to.equal(200);
			expect(token.body.token).not.to.be.null;
			done();
		});
	});
});