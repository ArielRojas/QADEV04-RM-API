//CRUD TC rooms
//Brayan Gabriel Rosas Fernandez
var init = require('../../init');
var config = require(GLOBAL.initialDirectory+'/config/config.json');
var resourceConfig = require(GLOBAL.initialDirectory+config.path.resourceConfig);
var expect = require('chai').expect;
var tokenAPI = require(GLOBAL.initialDirectory+config.path.tokenAPI);
var roomManagerAPI = require(GLOBAL.initialDirectory+config.path.roomManagerAPI);
var endPoints = require(GLOBAL.initialDirectory+config.path.endPoints);
var util = require(GLOBAL.initialDirectory+config.path.util);
var roomJson= require(GLOBAL.initialDirectory+'/config/room.json');
var mongodb=require(GLOBAL.initialDirectory+'/lib/mongodb');
//EndPoints
var url = config.url;
//var roomEndPoint = url+endPoints.rooms;
// global variables
var token = null; 
var jsonByDefault=roomJson.roomQueries.roomPut;
var room=null;
var endPoint=config.url+endPoints.rooms;
var endPoint2=config.url+endPoints.resources;
var json=null;

describe('Resource CRUD Suite get by id and put', function () {
	this.timeout(config.timeOut);
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

	before('Preconditions , get token and obtain a roomId',function (done) {	

		tokenAPI
			.getToken(function(err,res){
				token = res.body.token;
				console.log('Json on the Before '+JSON.stringify(roomJson.roomQueries.roomPut));
				json=roomJson.roomQueries.customDisplayName;
				//console.log('Json on the Before '+JSON.stringify(json));
				mongodb.findDocument('rooms',json,function(doc){
					 room=doc;
					done();
				});						
			});
	});

	after('Post conditions : restore the properties of the rooms changed ',function (done) {
		
		console.log('Json on the After '+JSON.stringify(jsonByDefault));
			roomManagerAPI.
				put(token,endPoint,jsonByDefault,function(err,res){
				done();
		});
					
	});

	it('CRUD-GET /Rooms/{:roomId} api returns the room specified', function (done) {

			endPoint=endPoint+'/'+room._id;
				roomManagerAPI
				.get(endPoint,function(err,res){
					expect(err).to.be.null;
					expect(res.status).to.equal(config.httpStatus.Ok);
					expect(res.body).to.have.property("displayName")
						.and.be.equal(room.displayName);
					expect(res.body).to.have.property("customDisplayName")
						.and.be.equal(room.customDisplayName);
					expect(res.body).to.have.property("emailAddress")
						.and.be.equal(room.emailAddress);
					expect(res.body).to.have.property("enabled")
						.and.be.equal(room.enabled);
					expect(res.body).to.have.property("_id")
						.and.be.equal(room._id.toString());
						done();
			});
		
	});


	it.skip('CRUD-PUT /rooms/{:roomId} api returns the rooms modified', function (done) {

		var json2=roomJson.roomQueries.roomPut;
		json2.emailAddress=util.generateString(12);
		json2.displayName=util.generateString(10);
		json2.enabled=false;
		json2.customDisplayName=util.generateString(10);
		json2.code=util.generateString(5);
		json2.__v=10;
		roomManagerAPI.
			put(token,endPoint,json2,function(err,res){
				console.log('Json on the put TC '+JSON.stringify(roomJson.roomQueries.roomPut));
				json={"customDisplayName":res.customDisplayName};

				mongodb.findDocument('rooms',json.customDisplayName,function(doc){	
					expect(err).to.be.null;
					expect(res.status).to.equal(config.httpStatus.Ok);
					expect(res.body).to.have.property("displayName")
					.and.be.equal(doc.displayName);
					expect(res.body).to.have.property("customDisplayName")
					.and.be.equal(doc.customDisplayName);
					expect(res.body).to.have.property("emailAddress")
					.and.be.equal(doc.emailAddress);
					expect(res.body).to.have.property("enabled")
					.and.be.equal(doc.enabled);
					expect(res.body).to.have.property("_id")
					.and.be.equal(doc._id.toString());
					expect(res.body).to.have.property("code")
					.and.be.equal(doc.code);
					expect(res.body).to.have.property("__v")
					.and.be.equal(doc.__v);
					done();
				});			
													
		   });			
	});
});


describe('Rooms associated to Resources', function(done) {

	before('Before Set',function (done) {
		tokenAPI
			.getToken(function(err,res){
				token = res.body.token;
				json=roomJson.roomQueries.customDisplayName;
				mongodb.findDocument('rooms',json,function(doc){
					room=doc;
						json=util.getRandomResourcesJson(resourceConfig.resourceNameSize);
						roomManagerAPI.post(token,endPoint2,json,function(err,resourceRes){
							resource=resourceRes;
						 	endPoint=endPoint+'/'+room._id+'/resources';	
						 	json=roomJson.resources.roomsAsoc;	
							json.resourceId=resource.body._id;
								roomManagerAPI.post
									(token,endPoint,json,function(err,resAsoc){
									resourceAsoc=resAsoc;
									//console.log('**********Room asociated '+JSON.stringify(resAsoc.body));
									done();
								});									
						});	
				});				
			});		
	});

	after('Before Set',function (done) {
		endPoint2=endPoint2+'/'+resource.body._id;
		roomManagerAPI
			.del(token,endPoint2,function(err,resourceDel){
				done();	
			});	
	});

	it('GET /rooms/{roomId}/resources ,CRUD Get a resources associated to room',function(done){	

		roomManagerAPI.get(endPoint,function(err,res){
			mongoJson={ "displayName" : "Floor1Room1"}
			mongodb.findDocument('rooms',mongoJson,function(doc){	
				console.log('++++Resource asociate from API: '+JSON.stringify(res.body[0]));		
				expect(err).to.be.null;
				expect(res.status).to.equal(config.httpStatus.Ok);
				expect(res.body[0]).to.have.property("_id")
				.and.be.equal(doc.resources[0]._id.toString());
				expect(res.body[0]).to.have.property("resourceId")
				.and.be.equal(doc.resources[0].resourceId.toString());
				expect(res.body[0]).to.have.property("quantity")
				.and.be.equal(doc.resources[0].quantity);
				done();
			
			});	
		});			  				  			 						
	});	

	it.skip('GET /rooms/{:roomId}/resources/{:roomResourceId}, CRUD get a specified resource of specified room',function(done){													
		endPoint=endPoint+'/'+resourceAsoc.body.resources[0]._id;
			roomManagerAPI.get(endPoint,function(err,res){
			mongodb.findDocument('rooms',mongoJson,function(doc){
				expect(err).to.be.null;
				expect(res.status).to.equal(config.httpStatus.Ok);
				expect(res.body[0]).to.have.property("_id")
				.and.be.equal(doc.resources[0]._id.toString());
				expect(res.body[0]).to.have.property("resourceId")
				.and.be.equal(doc.resources[0].resourceId.toString());
				expect(res.body[0]).to.have.property("quantity")
				.and.be.equal(doc.resources[0].quantity);
				done();
			});
		});	
	});	

	it.skip('PUT /rooms/{:roomId}/resources/{:roomResourceId},CRUD modify a specified resource of specified room',function(done){		
		 json=roomJson.roomQueries.resourcesUpdate;
		 roomManagerAPI.put(token,endPoint,json,function(err,resp){

			mongodb.findDocument('rooms',mongoJson,function(doc){
				expect(err).to.be.null;
				expect(res.status).to.equal(config.httpStatus.Ok);
				expect(res.body[0]).to.have.property("_id")
				.and.be.equal(doc.resources[0]._id.toString());
				expect(res.body[0]).to.have.property("resourceId")
				.and.be.equal(doc.resources[0].resourceId.toString());
				expect(res.body[0]).to.have.property("quantity")
				.and.be.equal(doc.resources[0].quantity);
				done();
			});
		
		});
	});	

	it.skip('DELETE /rooms/{:roomId}/resources/{:roomResourceId},CRUD Delete a resource associate to room ',function(done){	
		 roomManagerAPI.del(token,endPoint,function(err,resp){

		 	mongodb.findDocument('rooms',mongoJson,function(doc){
				expect(err).to.be.null;
				expect(res.status).to.equal(config.httpStatus.Ok);
				expect(res.body[0]).to.have.property("_id")
				.and.be.equal(doc.resources[0]._id.toString());
				expect(res.body[0]).to.have.property("resourceId")
				.and.be.equal(doc.resources[0].resourceId.toString());
				expect(res.body[0]).to.have.property("quantity")
				.and.be.equal(doc.resources[0].quantity);
				done();
			});
		
		 });						
	});	
	
});

