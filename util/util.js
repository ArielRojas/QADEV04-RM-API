// util
var config = require('../config/config.json')
var resourceConfig = require('../config/resource.json');
var generateString = function(size){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < size; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

exports.generateString = generateString;

var getRandomResourcesJson = function(size)
{
	if(size==undefined)
		size = 12;
	var resourceJSon = resourceConfig.resourceJson;
		resourceJSon = JSON.stringify(resourceJSon).replace(/resourceName/g,generateString(size));
		resourceJSon = JSON.parse(resourceJSon);
		return resourceJSon;
};
exports.getRandomResourcesJson = getRandomResourcesJson;


var generateRandom=function (min,max){

    if(min==max)
        return max;

    else{

        return Math.round(Math.random()*(max-min)+min);
    }

};

exports.generateRandom = generateRandom;