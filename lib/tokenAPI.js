//get token
//Author Ariel Wagner Rojas
var request = require('superagent');
require('superagent-proxy')(request);

var config = require('../config/config.json');
var endPoints = require(config.path.endPoints);
var tokenEndPoint = config.url + endPoints.tokenEndPoint;

/**
 * This method helps to get a token, the paramenters that needs are:
 * @userCredentialJSON {JSON} This parameter contains the credentials for access to Room Manager
 * @callback contains the function instance
 */
var getToken = function(userCredentialJSON, callback){
	console.log('POST ' + tokenEndPoint);
	request
		.post(tokenEndPoint)
		.send({username: userCredentialJSON.username, password: userCredentialJSON.password, authentication: userCredentialJSON.authentication})
	.end(function(err, res){
		if(err){
			console.log('Error when getting the token...' + JSON.stringify(res.body));
		}
		else{
		console.log('Status: ' + res.status);
		console.log('Token...' + res.body.token);
		}
		callback(res);
	});
}
exports.getToken = getToken;
