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
/**
 * Function: generateLocationJson
 * This function generate random string to location that recive of size for name, custom name and description
 * Parameters:
 *   sizeName        - is the size of name of location
 *   customNameSize  - is the size of display name
 *   descriptionSize - is a small description about of location.
 * Returns:
 *   return the json with name, custonName and description of location.
 */
var generateLocationJson = function (sizeName, customNameSize, descriptionSize) {
	
	var locationsJson = 
		{
		  		"name" : generateString(sizeName),
				"customName" : generateString(customNameSize),
				"description": generateString(descriptionSize)
		};
	return locationsJson;
};
exports.generateLocationJson = generateLocationJson;