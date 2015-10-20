//Smoke TC Resources
//initial configuration
var request = require('superagent');
var expect = require('chai').expect;
var tokenAPI = require('../../lib/tokenAPI');
var util = require('../../util/util');
var resourcesAPI = require('../../lib/resourcesAPI');
var endPoints = require('..\\..\\config\\endPoints.json');
var config = require('..\\..\\config\\config.json');
//user account
var userJSon = config.userAccountJson;
//End Points
var url = config.url;
var tokenEndPoint = endPoints.login;
var resourceEndPoint = endPoints.resources;

// global variables
var token = null; 
describe('Resources', function () {
	this.timeout(config.timeOut);
	//bEFORE
	before('Before Set',function (done) {
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
		//getting the token
		tokenAPI
			.getToken(url+tokenEndPoint,userJSon,function(res){
				token = res.token;
				done();
			});
	});

	it('Get /Resources', function (done) {
		resourcesAPI
			.get(url+resourceEndPoint,function(err,res){
				expect(res.status).to.equal(200);
				done();
			});
	});

	it('Post /Resources', function (done) {
		var resourceId = null;
		resourceName = util.generateString(12);
		var resourceJSon = {
			  "name": resourceName,
			  "customName": resourceName,
			  "fontIcon": "fa fa-tv",
			  "from": "",
			  "description": "This is a resource"
		};
		
		request
			.post(url+resourceEndPoint)
			.set('Authorization','jwt '+token)
			.send(resourceJSon)
			.end(function(err,res){
				resourceId = res.body._id;
				expect(res.status).to.equal(200);
				resourcesAPI.delete(url+resourceEndPoint,resourceId,token,function(){
					done();	
				});
			});
	});

	it('Get /Resources/{id}', function (done) {
		resourcesAPI
			.create(url+resourceEndPoint,token,function(res){
				var resourceId = res.body._id
				request
					.get(url+resourceEndPoint+'/'+resourceId)
					.set('Authorization','jwt '+token)
					.end(function(err,res){

						expect(res.status).to.equal(200);
						resourcesAPI.delete(url+resourceEndPoint,resourceId,token,function(){
							done();	
						});	
					});
			});
	});
	it('Put /Resources/{id}', function (done) {
		resourceName = util.generateString(12);
		var resourceUpdate = config.resourceJson;
		resourceUpdate = JSON.stringify(resourceUpdate).replace(/resourceName/g,resourceName);
		resourceUpdate = JSON.parse(resourceUpdate);
		//console.log('original ',resourceUpdate);
		resourcesAPI
			.create(url+resourceEndPoint,token,function(res){
				var resourceId = res.body._id
				//console.log('creaado',res.body);
				request
					.put(url+resourceEndPoint+'/'+resourceId)
					.set('Authorization','jwt '+token)
					.send(resourceUpdate)
					.end(function(err,res){
						//console.log('cambiado',res.body);
						expect(res.status).to.equal(200);
						resourcesAPI.delete(url+resourceEndPoint,resourceId,token,function(){
							done();	
						});	
					});
			});
	});

	it('Delete /Resources/{id}', function (done) {
		
	resourcesAPI
		.create(url+resourceEndPoint,token,function(res){
			var resourceId = res.body._id;
			resourcesAPI
				.delete(url+resourceEndPoint,resourceId,token,function(res){
					expect(res.status).to.equal(200);
					done();
				});
		});
	});
});