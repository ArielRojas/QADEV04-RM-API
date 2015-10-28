//scenario3.1.js
//Ivan Morales Camacho
var init = require('../../init');
var expect = require('chai').expect;
var config = require(GLOBAL.initialDirectory+'/config/config.json');
var tokenAPI = require(GLOBAL.initialDirectory+config.path.tokenAPI);
var roomManagerAPI = require(GLOBAL.initialDirectory+config.path.roomManagerAPI);
var util=require(GLOBAL.initialDirectory+config.path.util);
var getEndPoint=require(GLOBAL.initialDirectory+config.path.endPoints);
var mongodb= require(GLOBAL.initialDirectory+config.path.mongodb);
var ObjectId = require('mongodb').ObjectID;
var outOfOrderConfig = require(GLOBAL.initialDirectory+config.path.outOfOrder);
var roomJson = require(GLOBAL.initialDirectory+config.path.room);
var resourceConfig = require(GLOBAL.initialDirectory+config.path.resourceConfig);
/* out of order*/     	
var outOfOrderbyIDEndPoint=config.url+getEndPoint.getOutOfOrder;
var outOfOrderbyServiceEndPoint=config.url+getEndPoint.getOutOfOrderbyService;
//resource
var resourceEndPoint = config.url+getEndPoint.resources;
var url = config.url;
//locations
var locationConfig = require(GLOBAL.initialDirectory+config.path.locationConfig);
var endPoint = config.url + getEndPoint.locations;
var endPointById = config.url + getEndPoint.locationById;
var size = locationConfig.size;
//timeout
var timeout=config.timeOut;
//global variables
var endPointOutOfOrder= null;
var resourceId = null;
var room = null;
var roomId = null;
var token=null;
var locationID = null; 
var endPointLocationById = null;
var locationJson  = null;
var outOforderId = null;
/*
Scenario 3 – Undone item to a subproject that it is not empty

Given there is a project
	And a subproject is created
	And items are created inside of the subproject
	And one item is marked as done
	And the done item is deleted
When the item is restored from the Recycle Bin to the subproject
	Then ensure the item is displayed in the subproject's done list
When the item is unmarked as done 
	Then ensure the item is removed from the subproject's done list.
	And the item is now active
*/

describe('Scenario 3 – create a meeting in a room out of order ', function () {
	this.timeout(timeout);
	context('Given a room out of order create a meeting ',function(){
		before('get the token of the roomManager',function(done) {
			process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
			tokenAPI
				.getToken(function(err,res){
					token = res.body.token;
					done();
				});
		});	
		before('return  the room of room manager',function(done) {
			mongodb.findDocument('rooms',roomJson.roomUpdateQ.customDisplayName,function(res){
				room = res;
				roomId= res._id;
				done();
			});
		});
		before('create a locations ',function(done) {
			locationJson = util.generateLocationJson(size.nameSize,size.customNameSize,size.description);
			roomManagerAPI
				.post(token,endPoint,locationJson,function (err,res) {
					locationID = res.body._id;
					endPointLocationById = util.stringReplace(endPointById,locationConfig.locationIdReplace,locationID);
					console.log('create a location' );
					done();
				});
		});
		after('delete a locations ',function(done) {
			roomManagerAPI
			  .del(token,endPointLocationById,function (err,res) {
			  	console.log('deleted a locations');
			  	 	done();
			  });
		});	
		before('create a resource',function(done) {
			var resourceJSon = util.getRandomResourcesJson(resourceConfig.resourceNameSize);
			roomManagerAPI
				.post(token,resourceEndPoint,resourceJSon,function(err,res){
					resourceId = res.body._id;
					done();
				});
		});
		after('delete a resource',function(done) {
			if(resourceId!=null)
			{	roomManagerAPI
					.del(token,resourceEndPoint+'/'+resourceId,function(err,res){
						resourceId = null;
						console.log('deleted a resource with id ' + resourceId);
						done(); 
			});
			}else{
				console.log('the resourceID is null (after)');
			}
		});
		before('associate a resource to room',function(done){
			console.log('\t \t associate a resource to room');
			associateResource = { "resourceId" :resourceId};
			var associateEndPointR = url + '/rooms/'+roomId+'/resources';
			roomManagerAPI
				.post(token,associateEndPointR,associateResource, function(err, res){
					done();
				});		
		});		
		before('associate a location to room',function(done){
			console.log('\t \t associate a location to room');
			associateLocation = { "locationId" :locationID};
			var associateEndPointL = url + '/rooms/'+roomId;
			roomManagerAPI
				.put(token,associateEndPointL,associateLocation, function(err, res){
					done();
				});				

		});
		before('put out of order a room',function(done){
			console.log('\t \t put out of order a room');
			endPoint1= util.stringReplace(outOfOrderbyIDEndPoint,config.nameId.serviceId,room.serviceId);
			endPointOutOfOrder= util.stringReplace(endPoint1,config.nameId.roomId,room._id);
			outOfOrderConfig.bdtJson.roomId=roomId;
			associateOutOfOrder=outOfOrderConfig.bdtJson,
			roomManagerAPI.post(token,endPointOutOfOrder,associateOutOfOrder,function(err,res){
				outOforderId= res.body._id;
				done();
			});					
		});
		after('remove out of order of a room',function(done){
			console.log('\t \t remove out of order a room');
			endPoint1= util.stringReplace(outOfOrderbyServiceEndPoint,config.nameId.serviceId,room.serviceId);
			endPoint2= util.stringReplace(endPoint1,config.nameId.roomId,room._id);
			endPoint= util.stringReplace(endPoint2,config.nameId.outOfOrderId,outOforderId);	
			roomManagerAPI
				.del(token,endPoint,function(err,res){
					done();
				});				
		});
		describe('When you want to create a meeting when a room is out of order, it should not be possible', function () {
			it('Create a meeting in a room out of order', function () {
				
			});
		});
	});
	
});
						
