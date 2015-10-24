//CRUD testing - POST Authentication
//Author Ariel Wagner Rojas
// the next line call the file init.js to declare a global var(GLOBAL.initialDirectory)
var init = require('../../init');
//with config it can use the parameters located into the config file
var config = require(GLOBAL.initialDirectory+'/config/config.json');
var expect = require('chai').expect;
//with tokenAPI it can use the methods located into the tokenAPI file
var tokenAPI = require(GLOBAL.initialDirectory+config.path.tokenAPI);
var util = require(GLOBAL.initialDirectory+config.path.util);

describe('CRUD testing for Authentication (token)', function () {

	this.timeout(config.timeOut);

	before('Setting for obtain the token', function(){
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
    });

    it('POST /Authentication/login (local) return a valid token', function (done){
		tokenAPI
		.getToken(function(err, token){
			expect(token.status).to.equal(config.httpStatus.Ok);
			expect(token.body.token).not.to.be.null;
			expect(token.body.token).to.not.be.undefined;
			expect(token.body).to.have.property("token");
			expect(token.body.token).to.be.a('string');
			done();
		});
	});

	it('POST /Authentication/login (local) return a valid username', function (done){
		tokenAPI
		.getToken(function(err, res){
			expect(res.status).to.equal(config.httpStatus.Ok);
			expect(res.body.username).not.to.be.null;
			expect(res.body.username).to.not.be.undefined;
			expect(res.body.username).to.be.a('string');
			expect(res.body).to.have.property("username")
			.and.be.equal(config.userAccountJson.username);
			done();
		});
	});
	it('POST /Authentication/login (local) Verify that the token is created in a valid date', function (done) {
		tokenAPI
		.getToken(function(err, res){
			var currentDate = util.getDateFromUnixTimeStamp((new Date()).getTime());
			var createdAuth = res.body.createdAt.substr(0, 10);
			expect(res.status).to.equal(config.httpStatus.Ok);
			expect(res.body.createdAt).not.to.be.null;
			expect(res.body.createdAt).to.not.be.undefined;
			expect(currentDate).to.equal(createdAuth);
			done();
		});
	});
	it('POST /Authentication/login (local) Verify that the hours difference between the creation and expiration of token is six', function (done) {
		tokenAPI
		.getToken(function(err, res){
			//var currentDate = util.getDateFromUnixTimeStamp((new Date()).getTime());
			var date = new Date();
			var hour = date.getHours();
			//var expiration = res.body.expiration;
			var hourCreation = parseInt(res.body.createdAt.substr(11,2));
			var hourExpiration = parseInt(res.body.expiration.substr(11,2));
			differenceHours = hourExpiration - hourCreation;
			expect(res.status).to.equal(config.httpStatus.Ok);
			expect(res.body.createdAt).not.to.be.null;
			expect(res.body.createdAt).to.not.be.undefined;
			//expect(currentDate).to.equal(createdAuth);
			expect(differenceHours).to.equal(6);
			done();
		});
	});
});
