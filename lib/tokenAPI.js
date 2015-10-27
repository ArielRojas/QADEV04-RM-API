// Token API
//Jean Carlo Rodriguez
var request = require('superagent');
var config = require(GLOBAL.initialDirectory+'/config/config.json');
var endPoint = require(GLOBAL.initialDirectory+config.path.endPoints);
var url = config.url;
var tokenEndPoint = endPoint.login;
var userAccountJson = config.userAccountJson;
var log4js = require('log4js');
log4js.loadAppender(config.Log4js.format);
log4js.addAppender(log4js.appenders.file(config.Log4js.path), config.Log4js.nameLog);
var logger = log4js.getLogger(config.Log4js.nameLog);
/**
 * method that returns a token based in the account of the config.json
 * @param a callback function
 *     
 * @return err, res that contains the info of the token request
 */
var getToken = function(callback){
	logger.info('Getting token');
	request
		.post(url+tokenEndPoint)
		.send(userAccountJson)
		.end(function(err, res){
			if(err){
				logger.error('Error when getting the token...' + JSON.stringify(res.body));
			}
			else{
				logger.trace('Token...:' + res.body.token);
			}
		callback(err,res);
		});
};
exports.getToken = getToken;
