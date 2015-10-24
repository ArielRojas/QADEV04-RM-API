// util
var moment = require('moment');
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

var getDate = function(){
    var date = new Array();
    var objToday = new Date();
    domEnder = new Array( '', '', '', '', '', '', '', '', '', '' );
    dayOfMonth = today + (objToday.getDate()+1 < 10) ? '0' + objToday.getDate()+1 + domEnder[objToday.getDate()+1] : (objToday.getDate()+1) + domEnder[parseFloat(("" + (objToday.getDate()+1)).substr(("" + (objToday.getDate()+1)).length - 1))];
    months = new Array('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12');
    curMonth = months[objToday.getMonth() + 1];
    curYear = objToday.getFullYear();
    if(curHour<10){
        curHour='0'+curHour;
    };
    var today  =  curYear+ "-" + curMonth + "-"+dayOfMonth+"T" +curHour+ ":" + "00:00.000Z";
    var today_end  =  curYear+ "-" + curMonth + "-"+dayOfMonth+"T" +curHour+ ":"  + "10:00.000Z";
    date.push(today,today_end);
    return date;
};
exports.getDate = getDate;

getRandomRoomId = function (rooms) {
    var data = new Array();
    var nro = Math.round(Math.random() * (rooms.body.length - 1));
    data.push(rooms.body[nro]._id, rooms.body[nro].displayName);
    return data;
};
exports.getRandomRoomId = getRandomRoomId;

var getDateFromUnixTimeStamp = function (timeStamp) {
    var date = moment(timeStamp,'x').format('YYYY-MM-DD');
    return date;
};
exports.getDateFromUnixTimeStamp = getDateFromUnixTimeStamp;