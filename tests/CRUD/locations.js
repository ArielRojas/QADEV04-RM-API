/**
 * CRUD locations by: Jose Antonio Cardozo
 */
var init = require('../../init');
var config = require(GLOBAL.initialDirectory+'/config/config.json');
var expect = require('chai').expect;
var tokenAPI = require(GLOBAL.initialDirectory+config.path.tokenAPI);
var endPoints = require(GLOBAL.initialDirectory+config.path.endPoints);
var roomManagerAPI = require(GLOBAL.initialDirectory+config.path.roomManagerAPI);
var util = require(GLOBAL.initialDirectory+config.path.util);
var locationConfig = require(GLOBAL.initialDirectory+config.path.locationConfig);
var mongoDB = require(GLOBAL.initialDirectory+config.path.mongodb);

var ObjectId = require('mongodb').ObjectID;

//global variables
var token = null;
var endPoint = config.url + endPoints.locations;
var endPointById = config.url + endPoints.locationById;
var size = locationConfig.size;
var locationJsonId = locationConfig.locationIdForMongo;


describe('CRUD of RoomManager', function (){
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
	
	it('CRUD of GET /locations', function(done) {
		roomManagerAPI
			.get(endPoint,function (err,res){
				var arrayLocation = res;
				expect(arrayLocation.status).to.equal(config.httpStatus.Ok);
				expect(arrayLocation.body).to.not.be.null;
				for (var i = 0; i < arrayLocation.length; i++) {
					expect(arrayLocation.body[i]).to.have.property('_id');
					expect(arrayLocation.body[i]).to.have.property('path');
					expect(arrayLocation.body[i]).to.have.property('name');
					expect(arrayLocation.body[i]).to.have.property('customName');
					expect(arrayLocation.body[i]).to.have.property('description');
					expect(arrayLocation.body[i]).to.have.property('__v');	
				};
				mongoDB.findDocuments('locations',function (res) {
						for (var i = 0; i < res.length; i++) {
							expect(arrayLocation.body[i]._id).to.equal(res[i]._id.toString());
							expect(arrayLocation.body[i].path).to.equal(res[i].path);
							expect(arrayLocation.body[i].name).to.equal(res[i].name);
							expect(arrayLocation.body[i].customName).to.equal(res[i].customName);
							expect(arrayLocation.body[i].description).to.equal(res[i].description);
							expect(arrayLocation.body[i].__v).to.equal(res[i].__v);
						};
						done();		
					})
			});
	});

	describe('CRUD Test that need the DELETE the location at finished', function () {
		var locationID = null;
		var locationIDMongo = null;

		after(function (done) {
			var endPointLocationById = util.stringReplace(endPointById,locationConfig.locationIdReplace,locationID);
			roomManagerAPI
				.del(token,endPointLocationById,function (err,res) {
					done();
			});
		});

		it.skip('CRUD of POST /locations', function(done) {
		// create a locations with random string.
		var locationJson = util.generateLocationJson(size.nameSize,size.customNameSize,size.description);
		roomManagerAPI
			.post(token,endPoint,locationJson,function (err,res) {
				locationID = res.body;
				//locationJsonId =  { "_id": ObjectId(locationID) }
				console.log(locationID);
				
				//var locationCreated = res.body;
				expect(res.status).to.equal(config.httpStatus.Ok);
				/** verification the data of location created are the same was inserted in mongoDB, but not yet is implementing*/
				mongoDB
					.findDocument('locations',{ "_id": ObjectId("562d70cf562ce53c0b0e8d68") },function (err,res) {
						//console.log('gfvhg '+res);
						//expect(res.status).to.equal(config.httpStatus.Ok);
						expect(locationCreated._id).to.equal(res._id);
						expect(locationCreated.path).to.equal(res.path);
						expect(locationCreated.name).to.equal(res.name);
						expect(locationCreated.customName).to.equal(res.customName);
						expect(locationCreated.description).to.equal(res.description);

						console.log('location created ==' + JSON.stringify(locationCreated._id));
						console.log('location created ==' + JSON.stringify(locationCreated.path));
						console.log('location created ==' + JSON.stringify(locationCreated.name));
						console.log('location created ==' + JSON.stringify(locationCreated.customName));
						console.log('location created ==' + JSON.stringify(locationCreated.description));
						console.log('location created ==' + JSON.stringify(locationCreated));
						done();
					})
			});
		});
	});
	
	describe('CRUD Test that needed location created', function () {
		var location = null; 
		var endPointLocationById = null;
		var locationJson  = null;
	
		beforeEach(function (done) {
			locationJson = util.generateLocationJson(size.nameSize,size.customNameSize,size.description);
			roomManagerAPI
				.post(token,endPoint,locationJson,function (err,res) {
					location = res.body;
					endPointLocationById = util.stringReplace(endPointById,locationConfig.locationIdReplace,location._id);
					done();
				});
		});
	
		afterEach(function (done) {
			roomManagerAPI
			  .del(token,endPointLocationById,function (err,res) {
			  	 	done();
			  });
		});

		it('CRUD GET /locations/locationId', function (done) {
			roomManagerAPI
				.get(endPointLocationById,function (err,res) {
					expect(res.status).to.equal(config.httpStatus.Ok);
					expect(res.body).to.not.be.null;
					expect(res.body._id).to.equal(location._id);
					expect(res.body.path).to.equal(location.path);
					expect(res.body.name).to.equal(location.name);
					expect(res.body.customName).to.equal(location.customName);
					expect(res.body.description).to.equal(location.description);
					done();
				});
		});

		it('CRUD PUT /locations/locationId', function (done) {
			// generated the changes that want modify in the location.
			var locationJsonMod = util.generateLocationJson(size.nameSize,size.customNameSize,size.description);
			roomManagerAPI
				.put(token,endPointLocationById,locationJsonMod,function (err,res) {
					expect(res.status).to.equal(config.httpStatus.Ok);
					var locationModify = res.body;

					expect(locationJsonMod.name).to.equal(locationModify.name);
					expect(locationJsonMod.customName).to.equal(locationModify.customName);
					expect(locationJsonMod.description).to.equal(locationModify.description);
					done();
				});
		});
	});

	describe('create a locations for delete ', function () {
		var endPointLocationById = null;
		//this variable is for compare the location that want removed with the that it was removed in the expect of unit test.
		var locationToDeleted = null;
		before(function (done) {
			var locationJson = util.generateLocationJson(size.nameSize,size.customNameSize,size.description);
			roomManagerAPI
				.post(token,endPoint,locationJson,function (err,res) {
					locationToDeleted = res.body;
					endPointLocationById = util.stringReplace(endPointById,locationConfig.locationIdReplace,locationToDeleted._id);
					done();
			});
		});

		it('CRUD DELETE /locations/{:locationId}', function (done) {
			roomManagerAPI
			  .del(token,endPointLocationById,function (err,res) {
			  		// this the location that was deleted
			  		var locationRemove = res.body;

			  		expect(res.status).to.equal(config.httpStatus.Ok);
			  		expect(locationRemove._id).to.equal(locationToDeleted._id);
			  		expect(locationRemove.name).to.equal(locationToDeleted.name);
			  		expect(locationRemove.customName).to.equal(locationToDeleted.customName);
			  		expect(locationRemove._v).to.equal(locationToDeleted._v);
			  		expect(locationRemove.description).to.equal(locationToDeleted.description);
			  		expect(locationRemove.path).to.equal(locationToDeleted.path);
			  		done();
			  });
		});
	});

});


