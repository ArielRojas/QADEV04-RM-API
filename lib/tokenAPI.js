var request = require('superagent');
var config = require('../config/config.json');
var endPoint = require(config.path.endPoints);
var url = config.url;
var tokenEndPoint = endPoint.login;
var userAccountJson = config.userAccountJson;
/**
 * method that returns a token based in the account of the config.json
 * @param a callback function
 *     
 * @return err, res that contains the info of the token request
 */
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