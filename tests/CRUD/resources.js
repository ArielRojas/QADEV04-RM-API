//CRUD TC resource
//Jean Carlo Rodriguez
var init = require('../../init');
var config = require(GLOBAL.initialDirectory+'/config/config.json');
var resourceConfig = require(GLOBAL.initialDirectory+config.path.resourceConfig);
var expect = require('chai').expect;
var tokenAPI = require(GLOBAL.initialDirectory+config.path.tokenAPI);
var roomManagerAPI = require(GLOBAL.initialDirectory+config.path.roomManagerAPI);
var endPoints = require(GLOBAL.initialDirectory+config.path.endPoints);
var util = require(GLOBAL.initialDirectory+config.path.util);
//EndPoints
var url = config.url;
var resourceEndPoint = url+endPoints.resources;
// global variables
var token = null; 

describe('CRUD Suite', function () {
	this.timeout(config.timeOut);
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	var resourceId = null;
	var resourceJson = null;
	
	before(function (done) {
		tokenAPI
			.getToken(function(err,res){
				token = res.body.token;
				done();
			});
	});

	beforeEach(function (done) {
		//create a resource
		resourceJson = util.getRandomResourcesJson(resourceConfig.resourceNameSize);
		roomManagerAPI
			.post(token,resourceEndPoint,resourceJson,function(err,res){
				resourceId = res.body._id;
				done();
			});
	});
	afterEach(function (done) {
		//delete the resource
		if(resourceId!=null)
		{
			roomManagerAPI
				.del(token,resourceEndPoint+'/'+resourceId,function(err,res){
					resourceId = null;
					done();
				});
		}else{
			console.log('the resourceID is null (after)');
			
		}
		
	});
	it('CRUD-GET /Resources/{:Id} api returns the resources specified', function (done) {

		roomManagerAPI
			.get(resourceEndPoint+'/'+resourceId,function(err,res){

				expect(res.status).to.equal(config.httpStatus.Ok);
				expect(res.body).to.have.property("name")
					.and.be.equal(resourceJson.name);
				expect(res.body).to.have.property("customName")
					.and.be.equal(resourceJson.customName);
				expect(res.body).to.have.property("from")
					.and.be.equal(resourceJson.from);
				expect(res.body).to.have.property("description")
					.and.be.equal(resourceJson.description);
				expect(res.body).to.have.property("_id")
					.and.be.equal(resourceId);
				expect(res.body).to.have.property("fontIcon")
					.and.not.be.empty;
				done();
			});
		
	});

});