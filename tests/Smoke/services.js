//Services
//smoke test from Joaquin Gonzales Mosquera
var config = require('../../config/config.json');
var serviceConfig=require('../../config/service.json');
var expect = require('chai').expect;
var tokenAPI = require(config.path.tokenAPI);
var servicesAPI = require(config.path.servicesAPI);
var endPoints = require(config.path.endPoints);
var resourceConfig = require(config.path.resourceConfig);
//user account
var userJSon = config.userAccountJson;
var adminJson=serviceConfig.adminJson;
var roomJson=serviceConfig.roomJson;
//End Points
var url = config.url;
var tokenEndPoint = endPoints.login;
var resourceEndPoint = endPoints.resources;
var resourceIdEndPoint = endPoints.resourceId;
// global variables
var token = null; 
var idService=null;



describe('Smoke test for RoomManager',function()
{
	this.timeout(config.timeOut);
	var json={
 		 username: "jgonzales",
  		  password: "Control123",
 		 authentication: "local"
		};
	
	before(function (done) {
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
		//getting the token
		tokenAPI
			.getToken(function(err,res){
				token = res.body.token;
				done();
			});
	});
	after('After to create tests',function(done)
	{
		token = null;
		done();
	});
	it('POST /services Smoke Test, Verify the status 200 after to add a new service',function(done)
	{
		servicesAPI
			.postServices(adminJson,token,function(err,resp)
			{
				expect(resp.status).to.equal(200);
				done();
			});
	});
	it.only('GET /servicesType SomkeTest, Verify the status 200',function(done)
	{
		servicesAPI
			.getServiceType(function(err,res)
			{
				expect(res.status).to.equal(200);
				done();
			});
	});
	it('Get /services SmokeTest, Verify the status 200',function(done)
	{
		servicesAPI
			.getServices(token,function(err,res)
			{
				expect(res.status).to.equal(200);
				done();
			});
				
	});
	
	it('GET /services/ServiceID Smoke test, Verify the status 200 (GET method) by serviceID',function(done)
	{
		servicesAPI
			.getServices(token,function(err,resp){
			idService=resp.body[0]._id;		
			servicesAPI
				.getServiceByID(idService,function(err,res)
				{
					expect(res.status).to.equal(200);
					done();
				});
			});
	});
	it('DELETE /services/serviceID Smoke test, verify the status 200 after to delete an email server',function(done)
	{
		servicesAPI
			.getServices(token,function(err,resp)
			{
				idService=resp.body[0]._id;
				servicesAPI
					.deleteServices(idService,adminJson,token,function(err,res)
					{
						expect(res.status).to.equal(200);
						done();
					});
			});
	});
	it('GET /services/serviceID/rooms smoke test, verify the status 200 after to require rooms',function(done)
	{
		servicesAPI
			.getServices(token,function(err,resp)
			{
				idService=resp.body[0]._id;
				done();
				servicesAPI
					.getRooms(idService,function(err,res)
					{
						
						expect(res.status).to.equal(200);
						done();
					});
			});
	});
	it('GET /services/serviceID/rooms/roomID Smoke test, verify that the server returns the romm with IdRoom',function(done)
	{
		servicesAPI
			.getServices(token,function(err,resp)
			{
				idService=resp.body[0]._id;
				servicesAPI
					.getRooms(idService,function(err,res)
					{
						var array=res.body;
						servicesAPI
							.getRoomByID(array,idService,function(err,re)
							{
								expect(re.status).to.equal(200);
								done();
							});
					});
			});
	});
	it('PUT /services/serviceID/rooms/roomID Smoke test, verify that it is possible modify a room with method PUT',function(done)
	{
		servicesAPI
			.getServices(token,function(err,resp)
			{
				idService=resp.body[0]._id;
				servicesAPI
					.getRooms(idService,function(err,res)
					{
						var array=res.body;
						servicesAPI
							.getRoomByID(array,idService,function(err,re)
							{
								var room=re.body;
								servicesAPI
									.putRoom(room,token,roomJson,function(err,res)
									{
										expect(res.status).to.equal(200);
										done();
									});
							});
					});
			});
	});
});