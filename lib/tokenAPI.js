// Token API
var request = require('superagent');
var endPoint = require('../config/endPoints.json');
var config = require('../config/config.json');
var url = config.url;
var tokenEndPoint = endPoint.login;
var userAccountJson = config.userAccountJson;

var getToken = function(callback){
	console.log('Getting token');
	request
		.post(url+tokenEndPoint)
		.send(userAccountJson)
		.end(function(err, res){
			if(err){
				console.log('Error when getting the token...' + JSON.stringify(res.body));
			}
			else{
				console.log('Token...:' + res.body.token);
			}
		callback(err,res);
		});
};
exports.getToken = getToken;
