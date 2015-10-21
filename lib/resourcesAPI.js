// ResourcesAPI
//Jean Carlo Rodriguez
var request = require('superagent');
var util = require('../util/util');
var resourceConfig = require('../config/resource.json');

var del = function(resourceEndPoint,resourceId,token,callback){
	console.log('Bigin deleting the resource with the ID:',resourceId);
	request
		.del(resourceEndPoint+'/'+resourceId)
		.set('Authorization','jwt '+token)
		.end(function(err,res){
			if(res.status==200)
				console.log('resource deleted :',resourceId);
			callback(res);
		});
};
exports.delete = del;

var create = function(resourceEndPoint,token,callback){
	console.log("Creating a resource");
	var resourceJSon = util.getRandomResourcesJson(resourceConfig.resourceNameSize);
	request
		.post(resourceEndPoint)
		.set('Authorization','jwt '+token)
		.send(resourceJSon)
		.end(function(err,res){
			if(err)
				console.log(err);
			else
				console.log('Resource created :',res.body._id);
			callback(err,res);
		});
};
exports.create = create;

var obtain = function(resourceEndPoint,callback){
	request
		.get(resourceEndPoint)
		.end(function(err,res){
			if(err)
				console.log(err);
			else
				console.log('Resource Obtained:',(res.body._id == undefined) ? "" : res.body._id);
			callback(err,res);
	});
};
exports.obtain = obtain;

var update = function(resourceEndPoint,token,callback)
{
	var resourceUpdate = util.getRandomResourcesJson(resourceConfig.resourceNameSize);
	console.log('Updating a resource!');
	request
		.put(resourceEndPoint)
		.set('Authorization','jwt '+token)
		.send(resourceUpdate)
		.end(function(err,res){
			if(err)
				console.log(err);
			else
				console.log('Resource Updated :',res.body._id);
			callback(err,res);			
		});
};

exports.update = update;