//Smoke TC Resources
//Ivan Morales Camacho
var init = require('../../init');
var expect = require('chai').expect;
var config = require(GLOBAL.initialDirectory+'/config/config.json');
var tokenAPI = require(GLOBAL.initialDirectory+config.path.tokenAPI);
var roomManagerAPI = require(GLOBAL.initialDirectory+config.path.roomManagerAPI);
var util=require(GLOBAL.initialDirectory+config.path.util);
var getEndPoint=require(GLOBAL.initialDirectory+config.path.endPoints);
var mongodb= require('../../lib/mongodb');
/* End Points*/  
var RoomEndPoint=config.url+getEndPoint.room;     	
var outOfOrderbyIDEndPoint=config.url+getEndPoint.getOutOfOrder;
var outOfOrderbyServiceEndPoint=config.url+getEndPoint.getOutOfOrderbyService;
var outOfOrderId=config.url+getEndPoint.outOfOrderId;
var timeout=config.timeOut;

var endPointOutOfOrder= null;
var room = null;
var token=null;

describe('CRUD test about out of order', function () {
    
	/**
	 * Pre condition to execute the set Test Cases.
	 * Obtain a token to an user account setting in the config.json file,
	 * Get the token of room manager
	 */

	before('Before Set',function (done) {
			process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
			tokenAPI
				.getToken(function(err,res){
					token = res.body.token;
					done();
				});
		});
		 /**
		 * @description: Pre condition to execute the set Test Cases.
		 *return an endpoint by roomId and serviceId of a room out of order with the roomId
		 * @res: res an endpoint with the roomId
		 */	 
	before('return the Id of the room',function (done) {
		json={"customDisplayName": "Floor1Room1"};
		mongodb.findDocument('rooms',json,function(doc){
			doc = res.body[0];
			endPoint1= util.stringReplace(outOfOrderbyIDEndPoint,config.nameId.serviceId,res.body[0].serviceId)
			endPointOutOfOrder= util.stringReplace(endPoint1,config.nameId.roomId,res.res.body[0]._id)
			done();
		});
	});

	this.timeout(timeout);

	describe('set of tests that is need to before created and after delete a resource', function () {
		    var endPoint= null;
		    /**
			 * @description: Pre condition to execute the set Test Cases.
			 *return an endpoint of serviceId, roomId and out-of-orderId of a room out of order with the roomId
			 * @res: an endpoint with the roomId
			 */	  
			beforeEach('Before return an endpoint with use roomId, serviceId and out-of-orderId',function (done) {

				roomManagerAPI.get(endPointOutOfOrder,function(err,res){
					outOrderId= res.body[0]._id;
					endPoint1= util.stringReplace(outOfOrderbyServiceEndPoint,config.nameId.serviceId,room.serviceId)
					endPoint2= util.stringReplace(endPoint1,config.nameId.roomId,room._id)	
					endPoint= util.stringReplace(endPoint2,config.nameId.outOfOrderId,outOrderId)	
					done();		
				});			
			});
		    /**
			 * @description: Pre condition to execute the set Test Cases.
			 * create an out of order in a room spesific by ID
			 */	  
			beforeEach('before create the out of order',function (done) {
				roomManagerAPI
					.post(token,endPointOutOfOrder,util.generateOutOforderJson(room._id,util.getDate(0),util.getDate(1)),function(err,res){
						expect(res.status).to.equal(config.httpStatus.Ok);
						done();
					});	
			});	
		    /**
			 * @description: Pos condition to execute the set Test Cases.
			 * delete an out of order in a room spesific by ID
			 */	  				
			afterEach('after delete the out of order',function (done) {
				roomManagerAPI
					.del(token,endPoint,function(err,res){
						expect(res.status).to.equal(config.httpStatus.Ok);
						done();
					});	
			});

			it('GET//services/{:serviceId}/rooms/{:roomId}/out-of-orders', function(done) {
					roomManagerAPI
						.get(endPointOutOfOrder,function(err,res){
							expect(res.status).to.equal(config.httpStatus.Ok);
							done();
						});			
					
			});			

			it('GET/out-of-orders', function(done){
				roomManagerAPI
					.get(RoomEndPoint,function(err,res){
					    expect(res.status).to.equal(config.httpStatus.Ok);
						done();
				});
			});

		describe(' test with use out-of-orderId for rooms out of orders', function () {
		    var endPointorderId= null
		    /**
			 * @description: Pre condition to execute the set Test Cases.
			 * @res: return an endpoint of out-of-orderId of a room out of order 
			 */	
			beforeEach('Before return an endpoint with use out-of-orderId',function (done) {

				roomManagerAPI.get(endPointOutOfOrder,function(err,res){
					outOrderId= res.body[0]._id;
					endPointorderId=util.stringReplace(outOfOrderId,config.nameId.outOfOrderId,outOrderId);		
					done();		
				
				});
			});

			it('GET/{:out-of-orderId}', function(done){
				roomManagerAPI
					.get(endPointorderId,function(err,res){
					    expect(res.status).to.equal(config.httpStatus.Ok);
						done();
					});
			});

		});

		describe('set of tests with use roomId, serviceId and out-of-orderId for rooms out of orders', function () {


			it('GET//services/{:serviceId}/rooms/{:roomId}/out-of-orders/{:out-of-orderId}', function(done) {
				roomManagerAPI
					.get(endPoint,function(err,res){
						expect(res.status).to.equal(config.httpStatus.Ok);
						done();
					});			
			});

			it('PUT//services/{:serviceId}/rooms/{:roomId}/out-of-orders/{:out-of-orderId}', function(done) {
				roomManagerAPI
					.put(token,endPoint,util.generateOutOforderJson(room._id,util.getDate(2),util.getDate(3)),function(err,res){
						expect(res.status).to.equal(config.httpStatus.Ok);
						done();
					});					
			});
		});
	});

	describe('Smoke of Post and Remove services about out of order', function () {
		/**
		* @description: Pre condition to execute the set Test Cases.
		*return an endpoint of serviceId, roomId and out-of-orderId of a room out of order with the roomId
		* @res: an endpoint with the roomId
		 */	  
		beforeEach('Before Set',function (done) {
			roomManagerAPI.get(endPointOutOfOrder,function(err,res){
				outOrderId= res.body[0]._id;
				endPoint1= util.stringReplace(outOfOrderbyServiceEndPoint,config.nameId.serviceId,room.serviceId)
				endPoint2= util.stringReplace(endPoint1,config.nameId.roomId,room._id)	
				endPoint= util.stringReplace(endPoint2,config.nameId.outOfOrderId,outOrderId)	
				done();		
			});			
		});	

		describe('Smoke of Post service about out of order', function () {

			after('after delete the out of order',function (done) {
				roomManagerAPI
					.del(token,endPoint,function(err,res){
						expect(res.status).to.equal(config.httpStatus.Ok);
						done();
					});	
			});

			it('POST//services/{:serviceId}/rooms/{:roomId}/out-of-orders', function(done) {
				roomManagerAPI
					.post(token,endPointOutOfOrder,util.generateOutOforderJson(room._id,util.getDate(0),util.getDate(1)),function(err,res){
						expect(res.status).to.equal(config.httpStatus.Ok);
						done();
					});	
			});

		});
		describe('Smoke of Delete service about out of order', function () {
		    /**
			 * @description: Pre condition to execute the set Test Cases.
			 * create an out of order in a room spesific by ID
			 */	  
			before('defore create the out of order',function (done) {
				roomManagerAPI
					.post(token,endPointOutOfOrder,util.generateOutOforderJson(room._id,util.getDate(0),util.getDate(1)),function(err,res){
						expect(res.status).to.equal(config.httpStatus.Ok);
						done();
					});	
			});
		    /**
			 * @description: Pos condition to execute the set Test Cases.
			 * delete an out of order in a room spesific by ID
			 */	 
			it('DELETE//services/{:serviceId}/rooms/{:roomId}/out-of-orders', function(done) {
				roomManagerAPI
					.del(token,endPoint,function(err,res){
						expect(res.status).to.equal(config.httpStatus.Ok);
						done();
					});	
			});
		});
	});	
});