//RoomManagerAPI.js
var config=require(GLOBAL.initialDirectory+'/config/config');
var request=require('superagent');
var authorization=config.tokenHeader;
var tokenPrefix=config.tokenPrefix;
var get= function(endPoint,callback)
{
	request
		.get(endPoint)
	.end(function(err,res){
		if(err)
			console.log('Error getting from RoomManagerAPI: '+err)
		else
			console.log('getting success!');
		callback(err,res);
	});
	
};
exports.get=get;
var post=function (token,endPoint,json,callback)
{
	request
		.post(endPoint)
		.set(authorization,tokenPrefix+token)
		.send(json)
	.end(function(err,res){
		if(err)
			console.log('Error posting from RoomManagerAPI: '+err)
		else
			console.log('posting success!');
		callback(err,res);
	});
};
exports.post=post;

var put=function (token,endPoint,json,callback)
{
	request
		.put(endPoint)
		.set(authorization,tokenPrefix+token)
		.send(json)
	.end(function(err,res){
		if(err)
			console.log('Error putting from RoomManagerAPI: '+err)
		else
			console.log('putting success!');
		callback(err,res);
	});
};
exports.put=put;
var del=function (token,endPoint,callback)
{
	request
		.del(endPoint)
		.set(authorization,tokenPrefix+token)
	.end(function(err,res){
		if(err)
			console.log('Error deleting from RoomManagerAPI: '+err)
		else
			console.log('deleting success!');
		callback(err,res);
	});
};
exports.del=del;


