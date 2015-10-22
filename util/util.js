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





 var generateOutOforderJson = function (id,from,to,sizeTitle){
      var outOfOrderJson = 
		{		"roomId":id,
				"from": from,
				"to": to,
				"title":generateString(sizeTitle)			
		};
	return outOfOrderJson;
};
exports.generateOutOforderJson = generateOutOforderJson;
 /**
 * @description: This method get to Current date with diferent hours e.g. 2015-10-23T16:00:00.000Z
 * @num: sum the number sending to actual day  if you put 0, the day is the day actual
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