//CRUD example v1.0


var expect = require('chai').expect;
var config = require('../../config/config.json');
var outOfOrder = require('../../lib/outOfOrderAPI');
var tokenAPI = require(config.path.tokenAPI);



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
			.getOfOrder(function(res){
			    expect(res.status).to.equal(config.httpStatus.Ok);
				done();
			});
	});

	it('GET//services/{:serviceId}/rooms/{:roomId}/out-of-orders', function(done) {
		outOfOrder
			.getOfOrderbyID(function(res){
				expect(res.status).to.equal(config.httpStatus.Ok);
				done();
			});			
		
	});


	it('POST//services/{:serviceId}/rooms/{:roomId}/out-of-orders', function(done) {

		outOfOrder
			.creategetOfOrder(token,function(res){
				expect(res.status).to.equal(config.httpStatus.Ok);
				done();
			});
	});

	it('GET//services/{:serviceId}/rooms/{:roomId}/out-of-orders', function(done) {

		outOfOrder
			.getOfOrderbyService(function(res){
				expect(res.status).to.equal(config.httpStatus.Ok);
				done();
			});
	});


	it('PUT//services/{:serviceId}/rooms/{:roomId}/out-of-orders', function(done) {

		outOfOrder
			.putOrderbyService(token,function(res){
				expect(res.status).to.equal(config.httpStatus.Ok);
				done();
			});
	});

	it('DEL//services/{:serviceId}/rooms/{:roomId}/out-of-orders', function(done) {

		outOfOrder
			.delOrderbyService(token,function(res){
				expect(res.status).to.equal(config.httpStatus.Ok);
				done();
			});
	});


});

