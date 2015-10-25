//Services CRUD test cases by Joaquin Gonzales

var init = require('../../init.js');
var config = require(GLOBAL.initialDirectory+'/config/config.json');
var expect = require('chai').expect;
var assert = require('chai').assert;
//Configuration
var serviceConfig = require(GLOBAL.initialDirectory+config.path.serviceConfig);
var tokenAPI = require(GLOBAL.initialDirectory+config.path.tokenAPI);
var roomManagerAPI = require(GLOBAL.initialDirectory+config.path.roomManagerAPI);
var mongodb = require(GLOBAL.initialDirectory+config.path.mongodb);
var endPoints = require(GLOBAL.initialDirectory+config.path.endPoints);
//End Points
var url = config.url;
var serviceEndPoint = url+endPoints.services;
var serviceEndPointPost=serviceEndPoint + serviceConfig.postFilter;;
var serviceTypes = url+endPoints.serviceTypes;
//Global Variables
var token = null; 
var idService = null;
var idRoom = null;
var roomEndPoint = serviceEndPoint;
var rooms = endPoints.rooms;
var servicefromDB = null;
var servicejson = serviceConfig.service;
//status for response 200
var ok = config.httpStatus.Ok;

describe('CRUD Tesinting for Services Room Manager',function()
{
	this.timeout(config.timeOut);
	before(function(done)
	{
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
		tokenAPI
			.getToken(function(err,res)
			{
				token = res.body.token;
				done();
			});
	});
	after(function(done)
	{
		token=null;
		done();
	});
	it('GET /serviceType CRUD testing, verify request fields for servicetype ',function(done)
	{
		roomManagerAPI
			.get(serviceTypes,function(err,res)
			{
				expect(res.status).to.equal(ok);
				expect(res.body[0]).to.have.property('version');
				expect(res.body[0].version).to.equal('0.0.1');
				expect(res.body[0]).to.have.property('name');
				expect(res.body[0].name).to.equal('exchange');
				expect(res.body[0]).to.have.property('support');
				expect(res.body[0].support[0]).to.equal('Exchange Server 2010');
				done();

			});		
	});
	it('GET /services CRUD testing, verify request fields for Service',function(done)
	{
		mongodb
			.findDocument('services',servicejson,function(res)
			{
				servicefromDB=res;
				roomManagerAPI
					.getwithToken(token,serviceEndPoint,function(err,res)
					{
						expect(res.status).to.equal(200);
						expect(res.body[0]).to.have.property('type');
						expect(res.body[0].type).to.equal(servicefromDB.type);
						expect(res.body[0]).to.have.property('name');
						expect(res.body[0].name).to.equal(servicefromDB.name);
						expect(res.body[0]).to.have.property('version');
						expect(res.body[0].version).to.equal(servicefromDB.version);
						expect(res.body[0]).to.have.property('_id');
						//assert.typeOf(servicefromDB._id, 'string');
						expect(res.body[0]._id).to.equal(servicefromDB._id.toString());
						expect(res.body[0]).to.have.property('impersonate');
						expect(res.body[0].impersonate).to.equal(servicefromDB.impersonate);
						done();
					});
			});
	});
});