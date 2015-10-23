//Smoke TC Resources
//Ivan Morales Camacho

var init = require('../../init');
var expect = require('chai').expect;
var config = require(GLOBAL.initialDirectory+'/config/config.json');
var tokenAPI = require(GLOBAL.initialDirectory+config.path.tokenAPI);
var outOfOrder = require(GLOBAL.initialDirectory+config.path.outOfOrderAPI);
var timeout=config.timeOut;
var token=null;




describe('Smoke test about out of order', function () {
    
	/**
	 * Pre condition to execute the set Test Cases.
	 * @getToken(callback)
	 * Obtain a token to an user account setting in the config.json file,
	 * Get a room randomly
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
		

	it('GET/out-of-orders', function(done){
		outOfOrder
			.getOfOrder(function(err,res){
			    expect(res.status).to.equal(config.httpStatus.Ok);
				done();
			});
	});

	it('GET/{:out-of-orderId}', function(done){
		outOfOrder
			.getOutOfOrderId(function(err,res){
			    expect(res.status).to.equal(config.httpStatus.Ok);
				done();
			});
	});

	it('GET//services/{:serviceId}/rooms/{:roomId}/out-of-orders', function(done) {
		outOfOrder
			.getOfOrderServicesAndRoom(function(err,res){
				expect(res.status).to.equal(config.httpStatus.Ok);
				done();
			});			
		
	});


	it('POST//services/{:serviceId}/rooms/{:roomId}/out-of-orders', function(done) {

		outOfOrder
			.postOutOfOrder(token,function(err,res){
				expect(res.status).to.equal(config.httpStatus.Ok);
				done();
			});
	});

	it('GET//services/{:serviceId}/rooms/{:roomId}/out-of-orders/{:out-of-orderId}', function(done) {

		outOfOrder
			.getOfOrderServiceIdRoomIdOrderId(function(err,res){
				expect(res.status).to.equal(config.httpStatus.Ok);
				done();
			});
	});


	it('PUT//services/{:serviceId}/rooms/{:roomId}/out-of-orders/{:out-of-orderId}', function(done) {

		outOfOrder
			.putOrderbyService(token,function(err,res){
				expect(res.status).to.equal(config.httpStatus.Ok);
				done();
			});
	});

	it('DEL//services/{:serviceId}/rooms/{:roomId}/out-of-orders/{:out-of-orderId}', function(done) {

		outOfOrder
			.delOrderbyService(token,function(err,res){
				expect(res.status).to.equal(config.httpStatus.Ok);
				done();
			});
	});


});

