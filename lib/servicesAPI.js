var request= require('superagent');
//importing the global variables
var servicesConfig=require('../config/endPoints.json');
var config=require('../config/config.json');
var servicesCongiJson=require('../config/service.json');
//importing the util archive
var util=require('../util/util.js');
//configure the global variables
var servicesEndpoint=servicesConfig.services;
var serviceTypes=servicesConfig.serviceType;
var urlRoomManager=config.url;
var authorization=config.tokenHeader;
var jwt=config.tokenPrefix;
var postFilter= servicesCongiJson.postFilter;
var serviceById=servicesConfig.serviceById;
var roomsEndpoint=servicesConfig.roomsEndpoint;
var serviceID=0;

/**
 * method that returns the type of Email Server (Exchange or Google calendar) 
 * @param a callback function 
 *     
 * @return (res,err) , res that contains the object of the Email service,
 * and the err returns the possible error.
 */
var getServiceType=function(callback)
{
		request
			.get(urlRoomManager+serviceTypes)
		.end(function(err,res)
		{
			if(err) console.log(err);
			callback(err,res);
		});
}
exports.getServiceType=getServiceType;
/**
 * method that returns all information of Email Server connected with room manager
 * @param a callback function 
 *     
 * @return (res,err) , res that contains the object of the Email service,
 * and the err returns the possible error.
 */
var getServices=function(token,callback)
{
	request
		.get(urlRoomManager+servicesEndpoint)
		.set(authorization,jwt+token)
	.end(function(err,res)
	{
		callback(err,res);
	});
}
exports.getServices=getServices;
/**
 * method that returns a Email Server (Exchange or Google calendar) 
 * @param a callback function 
 *     
 * @return (res,err) , res that contains the object of the Email service,
 * and the err returns the possible error.
 */
var postServices=function(adminJson,token,callback)
{
	request
		.post(urlRoomManager+servicesEndpoint+postFilter)
		.set(authorization,jwt+token)
		.send(adminJson)
	.end(function(err,res)
	{
		callback(err,res);
	});
}
exports.postServices=postServices;
/**
 * method that returns a Server Email using an ID (Exchange or Google calendar) 
 * @param a callback function 
 *     
 * @return (res,err) , res that contains the object of the Email service using the ID of email server,
 * and the err returns the possible error.
 */
var getServiceByID=function(serviceId,callback)
{
	var serviceByid= serviceById.replace('{:serviceId}',serviceId);
	request
		.get(urlRoomManager+serviceByid)
	.end(function(err,res)
	{
		if(err)console.log(err);
		callback(err,res);
	})
}
exports.getServiceByID=getServiceByID;
/**
 * method that delete an Email Server (Exchange or Google calendar) 
 * @param a callback function 
 *     
 * @return (res,err) , res the result of the deleted of the Email service,
 * like a Json format
 * and the err returns the possible error.
 */
var deleteServices=function(serviceId,adminJson,token,callback)
{
	var serviceByid= serviceById.replace('{:serviceId}',serviceId);
	request
		.del(urlRoomManager+serviceByid)
		.set(authorization,jwt+token)
		.send(adminJson)
	.end(function(err,res)
	{
		callback(err,res);
	});
}
exports.deleteServices=deleteServices;
/**
 * method that returns all of rooms created in the Email Server (Exchange or Google calendar) 
 * @param a callback function 
 *     
 * @return (res,err) , res that contains all the rooms of the Email service,
 * and the err returns the possible error.
 */
var getRooms=function(serviceId,callback)
{
	roomsEndpoint=roomsEndpoint.replace('{:serviceId}',serviceId);
	request
		.get(urlRoomManager+roomsEndpoint)
	.end(function(err,res)
	{
		callback(err,res);
	});
}
exports.getRooms=getRooms;
/**
 * method that returns an specific room form 
 * Email Server (Exchange or Google calendar) 
 * @param a callback function 
 *     
 * @return (res,err) , res that contains the object(room) of the Email service,
 * and the err returns the possible error.
 */
var getRoomByID=function(arr,idService,callback)
{
	roomsEndpoint=roomsEndpoint.replace('{:serviceId}',idService);
	var i=util.generateRandom(1,arr.length);
	request
		.get(urlRoomManager+roomsEndpoint+'/'+arr[i]._id)
	.end(function(err,res)
	{
		callback(err,res);
	});
}
exports.getRoomByID=getRoomByID;
/**
 * method that returns a rooms modified of Email Server (Exchange or Google calendar) 
 * @param a callback function 
 *     
 * @return (res,err) , res that contains the object(Room) after to modified
 * the room of the Email service,
 * and the err returns the possible error.
 */
var putRoom=function(room,token,Json,callback)
{
	var roomId=room._id;
	var serviceID=room.serviceId;
	request
		.put(urlRoomManager+roomsEndpoint+'/'+roomId)
		.set(authorization,jwt+token)
		.send(Json)
	.end(function(err,res)
	{
		callback(err,res);
	});
}
exports.putRoom=putRoom;







