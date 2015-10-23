//Smoke TC Resources
//Ivan Morales Camacho
var init = require('../../init');
var expect = require('chai').expect;
var config = require(GLOBAL.initialDirectory+'/config/config.json');
var roomsAPI=require(GLOBAL.initialDirectory+config.path.roomsAPI);
var outOfOrderAPI=require(GLOBAL.initialDirectory+config.path.outOfOrderAPI);
var tokenAPI = require(GLOBAL.initialDirectory+config.path.tokenAPI);
var outOfOrder = require(GLOBAL.initialDirectory+config.path.outOfOrderAPI);
var roomManagerAPI = require(GLOBAL.initialDirectory+config.path.roomManagerAPI);
var util=require(GLOBAL.initialDirectory+config.path.util);
var getEndPoint=require(GLOBAL.initialDirectory+config.path.endPoints);
/* End Points*/  

var RoomEndPoint=config.url+getEndPoint.room;     
var outOfOrderbyIDEndPoint=config.url+getEndPoint.getOutOfOrder;
var outOrderPoint=config.url+getEndPoint.outOfOrder;
var outOfOrderbyServiceEndPoint=config.url+getEndPoint.getOutOfOrderbyService;
var outOfOrderEndPoint=config.url+getEndPoint.outOfOrderEndPoint;	
var timeout=config.timeOut;
var token=null;




describe('Smoke test about out of order', function () {
    
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

	this.timeout(timeout);

	describe('set of tests with use roomId and serviceId for rooms out of orders', function () {
	    var endPoint= null
		 /**
		 * @description: Pre condition to execute the set Test Cases.
		 * @res: return an endpoint by roomId and serviceId of a room out of order 
		 */	 
		beforeEach('Before set',function (done) {
			roomsAPI.getRoomByPos(0,function(err,room){
				endPoint= outOfOrderAPI.replaceEndPoint(room.serviceId,room._id)
				done();
			});
		});


		it('POST//services/{:serviceId}/rooms/{:roomId}/out-of-orders', function(done) {
			roomManagerAPI
				.post(token,endPoint,util.generateOutOforderJson(room._id,util.getDate(0),util.getDate(1),config.outOfOrderZise),function(err,res){
					expect(res.status).to.equal(config.httpStatus.Ok);
					done();
				});	
		});
		it('GET//services/{:serviceId}/rooms/{:roomId}/out-of-orders', function(done) {
			roomManagerAPI
				.get(endPoint,function(err,res){
					expect(res.status).to.equal(config.httpStatus.Ok);
					done();
				});			
			
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
	    var endPoint= null
	    /**
		 * @description: Pre condition to execute the set Test Cases.
		 * @res: return an endpoint of out-of-orderId of a room out of order 
		 */	
		beforeEach('Before Set',function (done) {
			roomsAPI.getRoomByPos(0,function(err,res){
				endPoint1=outOfOrderAPI.replaceEndPoint(res.serviceId,res._id);
				roomManagerAPI.get(endPoint1,function(err,resp){
					endPoint=outOfOrderAPI.replaceEndPoint(resp.body[0]._id);		
					done();		
				});
			});
		});

		it('GET/{:out-of-orderId}', function(done){
			roomManagerAPI
				.get(endPoint,function(err,res){
				    expect(res.status).to.equal(config.httpStatus.Ok);
					done();
				});
		});

	});

	describe('set of tests with use roomId, serviceId and out-of-orderId for rooms out of orders', function () {
	    var endPoint= null
		 /**
		 * @description: Pre condition to execute the set Test Cases.
		 * @res: return an endpoint of serviceId, roomId and out-of-orderId of a room out of order 
		 */	    
		beforeEach('Before Set',function (done) {
			roomsAPI.getRoomByPos(0,function(err,room){
				endPoint1= outOfOrderAPI.replaceEndPoint(room.serviceId,room._id)
				roomManagerAPI.get(endPoint1,function(err,res){
					endPoint= outOfOrderAPI.replaceEndPoint(room.serviceId,room._id,res.body[0]._id)	
					done();
				});
				
			});
		});

		it('GET//services/{:serviceId}/rooms/{:roomId}/out-of-orders/{:out-of-orderId}', function(done) {
			roomManagerAPI
				.get(endPoint,function(err,res){
					expect(res.status).to.equal(config.httpStatus.Ok);
					done();
				});			
		});


		it('PUT//services/{:serviceId}/rooms/{:roomId}/out-of-orders/{:out-of-orderId}', function(done) {
			roomManagerAPI
				.put(token,endPoint,util.generateOutOforderJson(room._id,util.getDate(2),util.getDate(3),config.outOfOrderZise),function(err,res){
					expect(res.status).to.equal(config.httpStatus.Ok);
					done();
				});					
		});


		it('DEL//services/{:serviceId}/rooms/{:roomId}/out-of-orders/{:out-of-orderId}', function(done) {
			roomManagerAPI
				.del(token,endPoint,function(err,res){
					expect(res.status).to.equal(config.httpStatus.Ok);
					done();
				});			
			
			});	

	});



});

