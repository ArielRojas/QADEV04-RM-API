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
/**this method return a Json with the field Name, Custom Name, From and description, with random values
 * @size  {number} the size of the random string for all fields
 * @return {Json}
 */
var getRandomResourcesJson = function(size){

	if(size==undefined)
		size = 12;
	var resourceJSon = resourceConfig.resourceJson;
		resourceJSon = JSON.stringify(resourceJSon)
		resourceJSon = stringReplace(resourceJSon,'resourceName',generateString(size));
		resourceJSon = stringReplace(resourceJSon,'resourceCustomName',generateString(size));
		resourceJSon = stringReplace(resourceJSon,'resourceFrom',generateString(size));
		resourceJSon = stringReplace(resourceJSon,'resourceDescription',generateString(size));

		resourceJSon = JSON.parse(resourceJSon);
		return resourceJSon;
};
exports.getRandomResourcesJson = getRandomResourcesJson;

/**
 * @text  {string} the text that its want to replace some value
 * @textToreplace  {[string} the text that is founded to then be replaced
 * @replaceWith  {string} the text that is wanded to be replaced
 * @text {string} return the string modified with the changes
 */
var stringReplace = function(text,textToReplace,replaceWith){
	text = text.replace(textToReplace,replaceWith);
	return text;
};
exports.stringReplace = stringReplace;

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
