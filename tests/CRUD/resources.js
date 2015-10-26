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
var mongodb = require(GLOBAL.initialDirectory+config.path.mongodb);
var ObjectId = require('mongodb').ObjectID;
//EndPoints
var url = config.url;
var resourceEndPoint = url+endPoints.resources;
// global variables
var token = null; 

describe('Resource CRUD Suite get by id and put', function () {
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
				console.log(resourceId);
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
					resourceJson = null;
					done();
				});
		}else{
			console.log('the resourceID is null (after)');
			
		}
		
	});
	it('CRUD-GET /Resources/{:Id} api returns the resources specified', function (done) {

		roomManagerAPI
			.get(resourceEndPoint+'/'+resourceId,function(err,res){

				expect(err).to.be.null;
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
				//expects with mongo
				mongodb.findDocument('resourcemodels',{"_id": ObjectId(resourceId)},function(items){
					expect(items).to.have.property("name")
						.and.be.equal(resourceJson.name);
					expect(items).to.have.property("customName")
						.and.be.equal(resourceJson.customName);
					expect(items).to.have.property("from")
						.and.be.equal(resourceJson.from);
					expect(items).to.have.property("description")
						.and.be.equal(resourceJson.description);
					expect(items).to.have.property("_id");
					expect(items._id.toString()).to.equal(resourceId);
					expect(items).to.have.property("fontIcon")
						.and.not.be.empty;
					done();
				});
				
			});
		
	});

	it('CRUD-PUT /Resources/{:id} api returns the resource modified', function (done) {
		var resourceJsonToUpdate = util.getRandomResourcesJson(resourceConfig.resourceNameSize);
		roomManagerAPI
			.put(token,resourceEndPoint+'/'+resourceId,resourceJsonToUpdate,function(err,res){
				expect(err).to.be.null;
				expect(res.status).to.equal(config.httpStatus.Ok);
				expect(res.body).to.have.property("_id")
					.and.be.equal(resourceId);
				expect(res.body).to.have.property("name")
					.and.be.equal(resourceJsonToUpdate.name);
				expect(res.body).to.have.property("customName")
					.and.be.equal(resourceJsonToUpdate.customName);
				expect(res.body).to.have.property("from")
					.and.be.equal(resourceJsonToUpdate.from);
				expect(res.body).to.have.property("description")
					.and.be.equal(resourceJsonToUpdate.description);
				expect(res.body).to.have.property("fontIcon")
					.and.not.be.empty;
				expect(res.body).to.have.property("__v");
				//expects with mongo
				mongodb.findDocument('resourcemodels',{"_id": ObjectId(resourceId)},function(items){
					expect(items).to.have.property("name")
						.and.be.equal(resourceJsonToUpdate.name);
					expect(items).to.have.property("customName")
						.and.be.equal(resourceJsonToUpdate.customName);
					expect(items).to.have.property("from")
						.and.be.equal(resourceJsonToUpdate.from);
					expect(items).to.have.property("description")
						.and.be.equal(resourceJsonToUpdate.description);
					expect(items).to.have.property("_id");
					expect(items._id.toString()).to.equal(resourceId);
					expect(items).to.have.property("fontIcon")
						.and.not.be.empty;
					done();
				});
			});

	});
});
//TODO
describe('Resource CRUD Suite delete', function () {
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

	it('CRUD-Delete /Resources/{:Id} api returns all the resources', function (done) {
		roomManagerAPI
				.del(token,resourceEndPoint+'/'+resourceId,function(err,res){
					expect(err).to.be.null;
					expect(res.status).to.equal(config.httpStatus.Ok);
					expect(res.body).to.have.property("_id")
						.and.be.equal(resourceId);
					expect(res.body).to.have.property("name")
						.and.be.equal(resourceJson.name);
					expect(res.body).to.have.property("customName")
						.and.be.equal(resourceJson.customName);
					expect(res.body).to.have.property("from")
						.and.be.equal(resourceJson.from);
					expect(res.body).to.have.property("description")
						.and.be.equal(resourceJson.description);
					expect(res.body).to.have.property("fontIcon")
						.and.not.be.empty;
					expect(res.body).to.have.property("__v");
					done();
				});

	});

	
});
//TODO
describe.skip('Resources CRUD get 10', function () {


	it.skip('CRUD-GET /Resources api returns all the resources', function (done) {
			
	});
});

describe.skip('suite', function () {
	it.skip('CRUD-POST /Resources api returns a created resource', function (done) {
		
	});
});
// testing jenkings8:30
