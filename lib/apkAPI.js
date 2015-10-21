//apk API
//Miguel Angel Terceros Caballero

var request = require('superagent');
require('superagent-proxy')(request);
//import configures
var endPoints = require('..//config//endPoints.json');
var config = require('..//config//config.json');
//endpoint complete
var url = config.url + endPoints.apk;

/**
 * @description: this method obtained the apk for mobile
 * @param: callback
 * @result: the result is that the apk is downloaded
 */
var getAPK = function(callback){
	request
		.get(url)
	.end(function(err,res){
		if(err){
			console.log('error - ' + err);
		}
		else{
			console.log('APK - ' + JSON.stringify(res.body));
		}		
		callback(err, res);
	});
};

exports.getAPK = getAPK;