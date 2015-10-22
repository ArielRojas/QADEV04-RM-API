// ResourcesAPI
//Jean Carlo Rodriguez
var request = require('superagent');
var config = require(GLOBAL.initialDirectory+'/config/config.json');
var util = require(GLOBAL.initialDirectory+config.path.util);
var endPoints = require(GLOBAL.initialDirectory+config.path.endPoints);
var resourceConfig = require(GLOBAL.initialDirectory+config.path.resourceConfig);
var url = config.url;
var resourceEndPoint = url+endPoints.resources;
var tokenHeader = config.tokenHeader;
var tokenPrefix = config.tokenPrefix;
console.log('from API'+GLOBAL.initialDirectory);
/**
 * method that delete a resources using a resource id and a Token
 * @param 
 * @resourceId = the resource ID
 * @token = the token
 * @return err and res in a callback that contains the info of the delete request
 */
var del = function(resourceId,token,callback){
	console.log('Bigin deleting the resource with the ID:',resourceId);
	request
		.del(resourceEndPoint+'/'+resourceId)
		.set(tokenHeader,tokenPrefix+token)
		.end(function(err,res){
			if(res.status==200)
				console.log('resource deleted :',resourceId);
			callback(err,res);
		});
};
exports.delete = del;
/**
 * method that create a resources using a Token
 * @param 
 * @token = the token
 * @return err and res in a callback that contains the info of the create request
 */
var create = function(token,callback){
	console.log("Creating a resource");
	var resourceJSon = util.getRandomResourcesJson(resourceConfig.resourceNameSize);
	request
		.post(resourceEndPoint)
		.set(tokenHeader,tokenPrefix+token)
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

/**
 * method that obatin all Resources in a Json (res.body)
 * @param 
 * @return err and res in a callback that contains the info of the get request
 */
var obtainAll = function(callback){
	request
		.get(resourceEndPoint)
		.end(function(err,res){
			if(err)
				console.log(err);
			else
				console.log('Resources Obtained!');
			callback(err,res);
	});
};
exports.obtainAll = obtainAll;
/**
 * method that obatin a Resource in a Json (res.body) using a resource Id
 * @param 
 * @resourceId = is a resource Id
 * @return err and res in a callback that contains the info of the get request
 */
var obtainById = function(resourceId,callback){
	request
		.get(resourceEndPoint+'/'+resourceId)
		.end(function(err,res){
			if(err)
				console.log(err);
			else
				console.log('Resource Obtained:'+res.body._id);
			callback(err,res);
	});
};
exports.obtainById = obtainById;

/**
 * method that update a Resources 
 * @param 
 * @resourceId = resource Id
 * @token = token
 * @return err and res in a callback that contains the info of the put request
 */
var update = function(resourceId,token,callback)
{
	var resourceUpdate = util.getRandomResourcesJson(resourceConfig.resourceNameSize);
	console.log('Updating a resource!');
	request
		.put(resourceEndPoint+'/'+resourceId)
		.set(tokenHeader,tokenPrefix+token)
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