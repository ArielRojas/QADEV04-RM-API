//SmokeRooms

var expect = require('chai').expect;
var roomsAPI = require('../lib/roomsAPI');
var resourceApi=require('../lib/ResourcesAPI');

var config=require('../config/config');
var endPoints=require('../config/endPoints');
var token=null;
var room=null;
var resource=null;
var sendJson={"quantity": 5};

describe('Smoke Testing for Room routes', function() {
this.timeout(config.timeout);

	/**
	 * Pre condition to execute the set Test Cases.
	 * @getToken(rollback)
	 * Obtain a token to an user account setting in the config.json file,
	 * Get a room randomly
	 */
	before('Before Set',function (done) {
			process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
		
		roomsAPI
			.getToken(function(res){
				token = res.body.token;
				roomsAPI.
					getRandomRoom(function(roomR){
					room=roomR;
					done();
				});				
		});
	});

/**
 * Smoke Test to the service room with the method get.
 */
	it ('Get /rooms ',function(done){

		roomsAPI.
		getAllRoom(function(rooms){

		 	expect(rooms.status).to.equal(200);			
			done();	
		});
	});	

/**
 * Smoke Test to the service room with the method get for roomId getting 
 * randondly.
 */
	it('Get /rooms/{roomId} ',function(done){
				
	 	roomsAPI.
	  	getRoomById(room._id,function(roomById){

	  	expect(roomById.status).to.equal(200);
	  	done();
	 	 })		 					
	});	

/**
 * Smoke Test to the service room with the method put for modify the
 * display name of the room 
 */
	it('PUT /room/{roomId}, Verify the status 200',function(done)
	{			
		var roomId=room._id;
			
		roomsAPI.editRoom(token,roomId,function(res)
		{
			
			expect(res.status).to.equal(200);
		done();
			
		});		
	});
});

describe('Smoke Testing for Room Resources routes ', function() {
this.timeout(config.timeout);

	/**
	 * Pre condition to execute the set Test Cases.
	 * @getToken(rollback)
	 * Obtain a token to an user account setting in the config.json file,
	 * Get a room randomly and create a resource
	 */
	before('Before Set',function (done) {
			process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
		
		roomsAPI
			.getToken(function(res){
				token = res.body.token;
				roomsAPI.
					getRandomRoom(function(roomR){
					room=roomR;
					resourceApi.create(token,function(resourceRes){
						resource=resourceRes;

						done();
					});

				
				});				
		});
	});

	after('Before Set',function (done) {
			process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
		
			resourceApi.delete(resource._id,token,function(resourceDel){

				done();
			});			
		
	});

/**
 * Smoke Test to the service room with the method get for getting a resource for
 * a specific room .
 */
	it('GET /rooms/{roomId}/resources ',function(done){				
		 	roomsAPI.
		  	getAllResourcesByRoomId(room._id,function(resourcesById){
		  	expect(resourcesById.status).to.equal(200);
		  	done();
		  })		 						
	});	

/**
 * Smoke Test to the service room with the method POST 
 * for associates the room with an existent resource.
 */
	it('POST rooms/{:roomId}/resources, Verify the status 200',function(done)
	{				
			roomsAPI
			.associateResourceRoom(room._id,resource._id,token,function(resourceAsoc){
				expect(resourceAsoc.status).to.equal(200);
				done();
			})						
	});

/**
 * Smoke Test to the service room with the method GET 
 * for getting a specific resources of a specific room.
 */
	it('GET /rooms/{:roomId}/resources/{:roomResourceId} ',function(done){
					
			roomsAPI
			.getSpecResourceToSpecRoom
			(room._id,resource._id,function(resourceAsoc){

				expect(resourceAsoc.status).to.equal(200);
			});					
			done();					
		
	});	

	it.skip('POST /rooms/{:roomId}/resources/{:roomResourceId} ',function(done){
					
			roomsAPI
			.editResourceOfRoom
			(token,room._id,resource._id,sendJson,function(resourceSpec){

				expect(resourceSpec.status).to.equal(200);
			});
			
			done();				
		
	});	

	it.skip('DELETE /rooms/{:roomId}/resources/{:roomResourceId} ',function(done){
								
			roomsAPI
			.removeSpecResourceSpecRoom
			(token,room._id,resource._id,function(resp){

				expect(resp.status).to.equal(200);				
			});	
		
			done();
	});	
});