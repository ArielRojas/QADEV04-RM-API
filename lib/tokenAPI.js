//get token
var request = require('superagent');
var config = require('../config/config.json');
var endPoint = require(config.path.endPoints);
var url = config.url;
var tokenEndPoint = endPoint.tokenEndPoint;
var userAccountJson = config.userAccountJson;

/**
 * This method helps to get a token, the paramenters that needs are:
 * @userCredentialJSON {JSON} This parameter contains the credentials for access to Room Manager
 * @callback contains the function instance
 */
var getToken = function(callback){
	console.log('Getting token');
	request
		.post(url + tokenEndPoint)
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