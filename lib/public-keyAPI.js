//public-key API
//Miguel Angel Terceros Caballero

var request = require('superagent');
require('superagent-proxy')(request);
//import configures
var endPoint = require('..//config//endPoints.json');
var config = require('..//config//config.json');
//endpoint complete
var url = config.url + endPoint.publicKey;

/**
 * @description: this method is to getting the public key
 * @param: callback
 * @res: the result is the public key
 */
var getPgpAPI = function(callback){
	request
		.get(url)
	.end(function(err,res){
		if(err){
			console.log('error - ' + err);
		}
		else{
			console.log('PGP public-key : ' + JSON.stringify(res.body));			
		}
		callback(res);		
	});
};

exports.getPgpAPI = getPgpAPI;