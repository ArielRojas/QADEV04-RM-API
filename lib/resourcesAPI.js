// ResourcesAPI

var request = require('superagent');
var util = require('../util/util');

var del = function(resourceEndPoint,resourceId,token,callback){
	//console.log(resourceEndPoint+' ID ' + resourceId);
	request
		.del(resourceEndPoint+'/'+resourceId)
		.set('Authorization','jwt '+token)
		.end(function(err,res){
			if(res.status==200)
				//console.log('resource deleted');

			callback(res);
		});
};
exports.delete = del;

var create = function(resourceEndPoint,token,callback){
	
	resourceName = util.generateString(12);
	var resourceJSon = {
		  "name": resourceName,
		  "customName": resourceName,
		  "fontIcon": "fa fa-tv",
		  "from": "",
		  "description": "This is a resource"
	};
	request
		.post(resourceEndPoint)
		.set('Authorization','jwt '+token)
		.send(resourceJSon)
		.end(function(err,res){
			callback(res);
		});
};
exports.create = create;

var get = function(resourceEndPoint,callback){
	request
		.get(resourceEndPoint)
		.end(function(err,res){
			callback(err,res);
			done();
		});
};
exports.get = get;