

var getConfig=require(GLOBAL.initialDirectory+'/config/config.json');
var getEndPoint=require(GLOBAL.initialDirectory+getConfig.path.endPoints);
/* End Points*/     
var outOfOrderbyIDEndPoint=getConfig.url+getEndPoint.getOutOfOrder;
var outOfOrderbyServiceEndPoint=getConfig.url+getEndPoint.getOutOfOrderbyService;
var outOfOrderId=getConfig.url+getEndPoint.outOfOrderId;

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
	if(orderbyID == undefined && roomId !=undefined){
		EndPoint1=outOfOrderbyIDEndPoint.replace('{:idService}',room.serviceId);
		endPoint=EndPoint1.replace('{:idRoom}',room._id);
	}else{
		endPoint1=outOfOrderbyServiceEndPoint.replace('{:serviceId}',serviceId);
	    endPoint2=endPoint1.replace('{:roomId}',roomId);
		endPoint=endPoint2.replace('{:outOfOrderId}',orderbyID);
	}
	if(roomId== undefined){
		endPoint=outOfOrderId.replace('{:out-of-orderId}',serviceId);
	}
	return 	endPoint;
}

exports.replaceEndPoint = replaceEndPoint;