//Smoke TC Resources
//Jean Carlo Rodriguez
var config = require('../../config/config.json');
var expect = require('chai').expect;
var tokenAPI = require(config.path.tokenAPI);
var resourcesAPI = require(config.path.resourcesAPI);
var endPoints = require(config.path.endPoints);
var resourceConfig = require(config.path.resourceConfig);
//user account
var userJSon = config.userAccountJson;
//End Points
var url = config.url;
var tokenEndPoint = endPoints.login;
var resourceEndPoint = endPoints.resources;
var resourceIdEndPoint = endPoints.resourceId;
// global variables
var token = null; 


describe('Resources Smoke tests', function () {
	this.timeout(config.timeOut);
	//Before
	before(function (done) {
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
		//getting the token
		tokenAPI
			.getToken(url+tokenEndPoint,userJSon,function(res){
				token = res.token;
				done();
			});
	});
	afterEach(function () {
		resourceIdEndPoint = endPoints.resourceId;
	});

	it('Get /Resources', function (done) {
		resourcesAPI
			.obtain(url+resourceEndPoint,function(err,res){
				expect(res.status).to.equal(config.httpStatus.Ok);
				done();
			});
	});

	it('Post /Resources', function (done) {
		var resourceId = null;
		resourcesAPI
			.create(url+resourceEndPoint,token,function(err,res){
				resourceId = res.body._id;
				expect(res.status).to.equal(config.httpStatus.Ok);
				//Delete resource
				resourcesAPI.delete(url+resourceEndPoint,resourceId,token,function(){
					done();	
				});
			});
	});

	it('Get /Resources/{id}', function (done) {
		resourcesAPI
			.create(url+resourceEndPoint,token,function(err,res){
				var resourceId = res.body._id
				resourceIdEndPoint = resourceIdEndPoint.replace('{:id}',resourceId);
				resourcesAPI
					.obtain(url+resourceIdEndPoint,function(err,res){
						expect(res.status).to.equal(config.httpStatus.Ok);
						resourcesAPI.delete(url+resourceEndPoint,resourceId,token,function(res){
							done();	
						});	
					});
			});
	});
	it('Put /Resources/{id}', function (done) {
		resourcesAPI
			.create(url+resourceEndPoint,token,function(err,res){
				var resourceId = res.body._id
				resourceIdEndPoint = resourceIdEndPoint.replace('{:id}',resourceId);
				resourcesAPI
					.update(url+resourceIdEndPoint,token,function(err,res){
						expect(res.status).to.equal(config.httpStatus.Ok);
						resourcesAPI.delete(url+resourceEndPoint,resourceId,token,function(){
							done();	
						});	
					});
			});
	});

	it('Delete /Resources/{id}', function (done) {
		
		resourcesAPI
			.create(url+resourceEndPoint,token,function(err,res){
				var resourceId = res.body._id;
				resourcesAPI
					.delete(url+resourceEndPoint,resourceId,token,function(res){
						expect(res.status).to.equal(config.httpStatus.Ok);
						done();
					});
			});
	});
});