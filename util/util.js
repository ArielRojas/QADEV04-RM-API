// util
var config = require('../config/config.json')
var resourceConfig = require('../config/resource.json');
var outOfOrderConfig = require('../config/outOfOrder.json');
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
 * @description: This method can replace some text of an endpoint specific
 * @param: endPoint, receive the endpoint e.g "/services/{:serviceId}/rooms/{:roomId}/out-of-orders"
 * @param: replaceId, the text that you wnat to replace e.g {:serviceId}
 * @param: id, Id of the room e.g 562505b9f2eab938088d5d9d
 * @res: return an end point "/services/562505b9f2eab938088d5d9d/out-of-orders
 */
var replaceEndPoint= function(endPoint,replaceId,id){

	var endPoint=endPoint.replace(replaceId,id);
	return 	endPoint;
}

exports.replaceEndPoint = replaceEndPoint;