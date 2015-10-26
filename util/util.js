// util
var config = require('../config/config.json')
var resourceConfig = require('../config/resource.json');
var outOfOrderConfig = require(GLOBAL.initialDirectory+config.path.outOfOrder);
var locationCongig = require('../config/locations.json');

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
 * @description: This method get a Json with create an out of order in a room
 * @param: id, room's Id of the roommanager
 * @param: to,  date to start the out of order e.g. e.g 2015-10-23T16:00:00.000Z
 * @param: from , date to end the out of order e.g. e.g 2015-10-24T24:00:00.000Z
 * @param: title , the title of the out of order
 * @res: return a Json with the configations entered
 */
 var generateOutOforderJson = function (id,from,to){
        var outOfOrder;
		outOfOrderConfig.outOfOrderJson.roomId=id;
		outOfOrderConfig.outOfOrderJson.from=from;
		outOfOrderConfig.outOfOrderJson.to=to;
		outOfOrderConfig.outOfOrderJson.title=generateString(outOfOrderConfig.titleSize);
		outOfOrder=outOfOrderConfig.outOfOrderJson
		return 	outOfOrder;

};
exports.generateOutOforderJson = generateOutOforderJson;
 /**
 * @description: This method get to Current date with diferent hours e.g. 2015-10-23T16:00:00.000Z
 * @param:  num sum the number sending to actual day  if you put 0, the day is the day actual
 * @res: return Current date e.g 2015-10-23T16:00:00.000Z
 */

var getDate = function(num){
	var date = new Date();
	var aleatorio = (Math.round(Math.random()*23))+1;
	if(aleatorio<10){aleatorio='0'+aleatorio}
	if(num==0){aleatorio=24}
    var time = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getDate()+num)+'T'+aleatorio+':00:00.000Z';
	return time;
}
exports.getDate = getDate;


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
 * this method returns a date in american format
 * @param  {Date} the parameter that is founded to then be replaced
 * @return {date}
 */
var getDateFromUnixTimeStamp = function (timeStamp) {
    var date = moment(timeStamp,'x').format('YYYY-MM-DD');
    return date;
};
exports.getDateFromUnixTimeStamp = getDateFromUnixTimeStamp;

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
	locationCongig.locationJson.name = generateString(sizeName),
	locationCongig.locationJson.customName = generateString(customNameSize),
	locationCongig.locationJson.description = generateString(descriptionSize)
	return locationCongig.locationJson;
};
exports.generateLocationJson = generateLocationJson;

