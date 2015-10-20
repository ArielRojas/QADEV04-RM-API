// Token API

var request = require('superagent');

var getToken = function(endPoint,userJSon,callback){

	request
		.post(endPoint)
		.send(userJSon)
		.end(function(err,res){
			callback(res.body);
		});
};

exports.getToken = getToken;
