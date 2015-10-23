/**
 * Smoke test of location by: Jose Antonio Cardozo
 */
var init = require('../../init');
var config = require(GLOBAL.initialDirectory+'/config/config.json');
var expect = require('chai').expect;
var tokenAPI = require(GLOBAL.initialDirectory+config.path.tokenAPI);
var endPoints = require(GLOBAL.initialDirectory+config.path.endPoints);
var locationAPI = require(GLOBAL.initialDirectory+config.path.roomManagerAPI);
var util = require(GLOBAL.initialDirectory+config.path.util);
var locationConfig = require(GLOBAL.initialDirectory+config.path.locationConfig);

//global variables
var token = null;
var url = config.url + endPoints.locations;
var endPointById = config.url + endPoints.locationById;
var size = locationConfig.size;

describe('Smoke testing for Locations of room manager', function() {
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

	it('GET /locations', function(done) {
		locationAPI
			.get(url,function (err,res){
				expect(res.status).to.equal(config.httpStatus.Ok);
				done();
			});
	});

	it('POST /locations', function(done) {
		// create a locations with random string
		var locationJson = util.generateLocationJson(size.nameSize,size.customNameSize,size.description);
		locationAPI
			.post(token,url,locationJson,function (err,res) {
				expect(res.status).to.equal(config.httpStatus.Ok);
				var locationID = res.body._id;
				var endPointLocationById = endPointById.replace('{:locationId}',locationID);
				locationAPI
				  .del(token,endPointLocationById,function (err,res) {
				  		done();
				  })
			});
	});

	it('GET /locations/{:locationId}', function(done) {
		var locationJson = util.generateLocationJson(size.nameSize,size.customNameSize,size.description);
		locationAPI
			.post(token,url,locationJson,function (err,res) {
				var locationID = res.body._id;
				var endPointLocationById = endPointById.replace('{:locationId}',locationID);
					locationAPI
						.get(endPointLocationById,function (err,res) {
							expect(res.status).to.equal(config.httpStatus.Ok);
							locationAPI
							  .del(token,endPointLocationById,function (err,res) {
							  	 	done();
							  })
						})
			})
	});

	it('PUT /locations/{:locationId}', function (done) {
		var locationJson = util.generateLocationJson(size.nameSize,size.customNameSize,size.description);
		locationAPI
			.post(token,url,locationJson,function (err,res) {
				var locationID = res.body._id;
				var endPointLocationById = endPointById.replace('{:locationId}',locationID);
				locationAPI
					.put(token,endPointLocationById,locationJson,function (err,res) {
						expect(res.status).to.equal(config.httpStatus.Ok);
						locationAPI
							.del(token,endPointLocationById,function (err,res) {
								done();
							})
					})
			})
	});

	it('DELETE /locations/{:locationId}', function (done) {
		var locationJson = util.generateLocationJson(size.nameSize,size.customNameSize,size.description);
		locationAPI
			.post(token,url,locationJson,function (err,res) {
				var locationID = res.body._id;
				var endPointLocationById = endPointById.replace('{:locationId}',locationID);
				locationAPI
				  .del(token,endPointLocationById,function (err,res) {
				  		expect(res.status).to.equal(config.httpStatus.Ok);
				  		done();
				  })
			});
	})
});
