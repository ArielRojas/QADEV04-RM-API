var request = require('superagent');

var roomManagerAPI=require('./roomManagerAPI');
var getConfig=require(GLOBAL.initialDirectory+'/config/config.json');
var getEndPoint=require(GLOBAL.initialDirectory+getConfig.path.endPoints);
var RoomEndPoint=getConfig.url+getEndPoint.room;   
 /**
 * @description: This method get a room with a determined Id
 * @param: callback
  * @param: pos, receive the pos of a room
 * @res: return the body of a room by Id
 */
var getRoomByPos = function(pos){
	roomManagerAPI.get(RoomEndPoint,function(err,res){
	room = res.body[pos];
	callback(err,room);
	});
};
exports.getRoomByPos = getRoomByPos;