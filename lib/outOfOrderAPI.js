var request = require('superagent');

var getConfig=require(GLOBAL.initialDirectory+'/config/config.json');
var roomManagerAPI=require('./roomManagerAPI');
var roomsAPI=require('./roomsAPI');
var util=require(GLOBAL.initialDirectory+getConfig.path.util);
var getEndPoint=require(GLOBAL.initialDirectory+getConfig.path.endPoints);
/* End Points*/  
var RoomEndPoint=getConfig.url+getEndPoint.room;     
var outOfOrderbyIDEndPoint=getConfig.url+getEndPoint.getOutOfOrder;
var outOrderPoint=getConfig.url+getEndPoint.outOfOrder;
var outOfOrderbyServiceEndPoint=getConfig.url+getEndPoint.getOutOfOrderbyService;
var outOfOrderEndPoint=getConfig.url+getEndPoint.outOfOrderEndPoint;	


 /**
 * @description: This method get all the room they are out of order 
 * @param: callback
 * @res: return the out of order of the rooms in roommanager
 */
var getOfOrder = function(callback){
	roomManagerAPI.get(RoomEndPoint,function(err,res){
	callback(err,res);
	});
};
exports.getOfOrder = getOfOrder;

 /**
 * @description: This method get out of order of a id out of order specific 
 * @param: callback
 * @res: return the room with  out of order specific
 */

var getOutOfOrderId= function(callback){
	roomsAPI.getRoomByPos(0,function(err,res){
		endPoint=replaceEndPoint(res.serviceId,res._id)
		roomManagerAPI.get(endPoint,function(err,res){
			endPoint1=outOfOrderEndPoint.replace('{:out-of-orderId}',res.body[0]._id);
			roomManagerAPI.get(endPoint1,function(err,res){
			callback(err,res);			
			});
		});
	});
};
exports.getOutOfOrderId = getOutOfOrderId;
 /**
 * @description: This method return the out of order of a roomn by room's Id
 * and service's id  spesific
 * @param: callback
 * @res: return a room out of order  
 */
var getOfOrderServicesAndRoom = function(callback){

	roomsAPI.getRoomByPos(0,function(err,room){
		endPoint= replaceEndPoint(room.serviceId,room._id)
		roomManagerAPI.get(endPoint,function(err,res){
		callback(err,res);
		});
	});
};
exports.getOfOrderServicesAndRoom = getOfOrderServicesAndRoom;

 /**
 * @description: This method created a out of order in a room's id and service's spesific
 * @param: callback
 * @param: token, the token of roommanager
 * @res: return a room out of order  
 */

var postOutOfOrder = function(token,callback){
	roomsAPI.getRoomByPos(0,function(err,room){
		endPoint= replaceEndPoint(room.serviceId,room._id)
		roomManagerAPI.post(token,endPoint,util.generateOutOforderJson(room._id,util.getDate(0),util.getDate(1),getConfig.outOfOrderZise),function(err,res){
			callback(err,res);	
		});	
	});
};
exports.postOutOfOrder = postOutOfOrder;

 /**
 * @description: This method get all the information of a room by a spesific service Id 
                  and out of order's Id
 * @param: callback
 * @res: return the room  out of order
 */
var getOfOrderServiceIdRoomIdOrderId = function(callback){
	
		roomsAPI.getRoomByPos(0,function(err,room){
				endPoint=replaceEndPoint(room.serviceId,room._id)
				roomManagerAPI.get(endPoint,function(err,res){
					endPoint1= replaceEndPoint(room.serviceId,room._id,res.body[0]._id)
					roomManagerAPI.get(endPoint1,function(err,res){
					callback(err,res);
					});				
				});					
		});
};
exports.getOfOrderServiceIdRoomIdOrderId = getOfOrderServiceIdRoomIdOrderId;

 /**
 * @description: This method modify a out of order of  a spesific service Id 'out of order'
 * @param: callback
 * @res: modify the  out of order of a room id specific
 */
var putOrderbyService = function(token,callback){
	
		roomsAPI.getRoomByPos(0,function(err,room){
			endPoint2=replaceEndPoint(room.serviceId,room._id)
			roomManagerAPI.get(endPoint2,function(err,res){
					endPoint3= replaceEndPoint(room.serviceId,room._id,res.body[0]._id)
					roomManagerAPI.put(token,endPoint3,util.generateOutOforderJson(room._id,util.getDate(1),util.getDate(2),getConfig.outOfOrderZise),function(err,res){
					callback(err,res);
				});					
			});						
		});
};
exports.putOrderbyService = putOrderbyService;
 
 /**
 * @description: This method delete a out of order of  a spesific service Id 'out of order'
 * @param: callback
 * @res: delete the  out of order of a room id specific
 */

var delOrderbyService = function(token,callback){

		roomsAPI.getRoomByPos(0,function(err,room){
			endPoint4=replaceEndPoint(room.serviceId,room._id)
			roomManagerAPI.get(endPoint4,function(err,res){
				endPoint5= replaceEndPoint(room.serviceId,room._id,res.body[0]._id)
				roomManagerAPI.del(token,endPoint5,function(err,res){
					callback(err,res);
				});	
			});	
		});
};
exports.delOrderbyService = delOrderbyService;

 /**
 * @description: This method return the endpoint about out of order by roomID or by outoforderID'
 * 	"getOutOfOrderbyID":"/services/{:serviceId}/rooms/{:roomId}/out-of-orders"
 *	"getOutOfOrderbyService":"/services/{:serviceId}/rooms/{:roomId}/out-of-orders/{:outOfOrderId}"
 *   if the method dont receive the 3 Id return the end point by roomId else return the end point
 *    by serviceId 
 * @param: serviceId, id of the service Id 
 * @param: orderbyID, Id of the of out order created in the room
 * @param: roomId, Id of the room 
 * @res: return an end point by roomId or outoforderId
 */
var replaceEndPoint= function(serviceId,roomId,orderbyID){
	if(orderbyID == undefined){
		EndPoint1=outOfOrderbyIDEndPoint.replace('{:idService}',room.serviceId);
		endPoint=EndPoint1.replace('{:idRoom}',room._id);
	}else{
		endPoint1=outOfOrderbyServiceEndPoint.replace('{:serviceId}',serviceId);
	    endPoint2=endPoint1.replace('{:roomId}',roomId);
		endPoint=endPoint2.replace('{:outOfOrderId}',orderbyID);
	}
	return 	endPoint;
}

