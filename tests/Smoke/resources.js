//Smoke TC Resources
//Jean Carlo Rodriguez
var config = require('../../config/config.json');
var expect = require('chai').expect;
var tokenAPI = require(config.path.tokenAPI);
var resourcesAPI = require(config.path.resourcesAPI);
// global variables
var token = null; 

describe('Resources Smoke tests', function () {
	this.timeout(config.timeOut);
	//Before
	before(function (done) {
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
		//getting the token
		tokenAPI
			.getToken(function(err,res){
				token = res.body.token;
				done();
			});
	});
	

	it('Get /Resources', function (done) {
		resourcesAPI
			.obtainAll(function(err,res){
				expect(res.status).to.equal(config.httpStatus.Ok);
				done();
			});
	});

	it('Post /Resources', function (done) {
		var resourceId = null;
		resourcesAPI
			.create(token,function(err,res){
				resourceId = res.body._id;
				expect(res.status).to.equal(config.httpStatus.Ok);
				//Delete resource
				resourcesAPI.delete(resourceId,token,function(err,res){
					done();	
				});
			});
	});

	it('Get /Resources/{id}', function (done) {
		resourcesAPI
			.create(token,function(err,res){
				var resourceId = res.body._id
				resourcesAPI
					.obtainById(resourceId,function(err,res){
						expect(res.status).to.equal(config.httpStatus.Ok);
						resourcesAPI.delete(resourceId,token,function(err,res){
							done();	
						});	
					});
			});
	});
	it('Put /Resources/{id}', function (done) {
		resourcesAPI
			.create(token,function(err,res){
				var resourceId = res.body._id
				resourcesAPI
					.update(resourceId,token,function(err,res){
						expect(res.status).to.equal(config.httpStatus.Ok);
						resourcesAPI.delete(resourceId,token,function(err,res){
							done();	
						});	
					});
			});
	});

	it('Delete /Resources/{id}', function (done) {
		
		resourcesAPI
			.create(token,function(err,res){
				var resourceId = res.body._id;
				resourcesAPI
					.delete(resourceId,token,function(err,res){
						expect(res.status).to.equal(config.httpStatus.Ok);
						done();
					});
			});
	});
});