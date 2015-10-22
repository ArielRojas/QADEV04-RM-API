var request = require('superagent');

var getEndPoint=require('../config/endPoints.json');
var getConfig=require('../config/config.json');
var util=require('../util/util.js');
/* End Points*/
var RoomEndPoint=getConfig.url+getEndPoint.room;        
var outOfOrderbyIDEndPoint=getConfig.url+getEndPoint.getOutOfOrder;
var outOrderPoint=getConfig.url+getEndPoint.outOfOrder;
var outOrderEndPoint=getConfig.url+getEndPoint.getOutOfOrderbyID;
var outOfOrderbyServiceEndPoint=getConfig.url+getEndPoint.getOutOfOrderbyService;
var outOfOrderEndPoint=getConfig.url+getEndPoint.outOfOrderEndPoint;	


 /**
 * @description: This method get all the information that is in the body of the room 
 * with out of order 
 * @param: callback
 * @res: return the body of a room 
 */
var getRoomOutOfOrder = function(callback){
	request
		.get(RoomEndPoint)
	.end(function(err,res){
         room = res.body[0];
		callback(err,room);
	});
};
exports.getRoomOutOfOrder = getRoomOutOfOrder;

 /**
 * @description: This method get all the room they are out of order
 * @param: callback
 * @res: return the out of order of the rooms in roommanager
 */
var getOfOrder = function(callback){
	request
		.get(outOrderPoint)
	.end(function(err,res){
		callback(err,res);
	});
};
exports.getOfOrder = getOfOrder;

 /**
 * @description: This method get out of order of a roomn by Id in roommanager
 * @param: callback
 * @res: return the out of order of the room 
 */
var getOfOrderbyID = function(callback){

		 getRoomOutOfOrder(function(err,room){
		 var EndPoint1=outOfOrderbyIDEndPoint.replace('{:idService}',room.serviceId);
		 var EndPoint=EndPoint1.replace('{:idRoom}',room._id);
			request
				.get(EndPoint) 
			.end(function(err,res){
					callback(err,res);	
			});
	});
};
exports.getOfOrderbyID = getOfOrderbyID;



 /**
 * @description: This method created a out of order in a room spesific
 * @param: callback
 * @res: return the out of order of the room 
 */
var createOutOfOrder = function(token,callback){
	getRoomOutOfOrder(function(err,room){
		 EndPoint1=outOfOrderbyIDEndPoint.replace('{:idService}',room.serviceId);
		 EndPoint=EndPoint1.replace('{:idRoom}',room._id);
			request
				.post(EndPoint)
				.set('Authorization','jwt '+token)
				.send({roomId:room._id,
						from: util.getDate(0),
						to: util.getDate(1),
						title: "Temporarily Out of Order",
						sendEmail: false})
			.end(function(err,res){
					callback(err,res);	
			});		
	});
};
exports.createOutOfOrder = createOutOfOrder;

 
 /**
 * @description: This method get all the out of order of a spesific room Id
 * @param: callback
 * @res: return the out of order of the room 
 */
var getEndPoint =function(callback){
	getRoomOutOfOrder(function(err,room){
         var endPoint1= outOrderEndPoint.replace('{:serviceId}',room.serviceId);
		 var endPoint= endPoint1.replace('{:roomId}',room._id);			
		request
			.get(endPoint)	 
		.end(function(err,res){
				callback(err,res)
			});
	});
}
exports.getEndPoint = getEndPoint;



var get= function(callback){

			getEndPoint(function(err,res){
				    orderbyID = res.body[0]._id;
					endPoint=outOfOrderEndPoint.replace('{:out-of-orderId}',orderbyID);
					request
					 .get(endPoint)
					.end(function(err,res){
						callback(err,res);
					});
			});			
};
exports.get = get;





 /**
 * @description: This method get all the information of a room by a spesific service Id 'out of order'
 * @param: callback
 * @res: return the room with a out of order
 */
var getOfOrderbyService = function(callback){
	
		getRoomOutOfOrder(function(err,room){
			getEndPoint(function(err,res){
				    orderbyID = res.body[0]._id;
		         	endPoint1=outOfOrderbyServiceEndPoint.replace('{:serviceId}',room.serviceId);
		         	endPoint2=endPoint1.replace('{:roomId}',room._id);
					endPoint=endPoint2.replace('{:outOfOrderId}',orderbyID);
					request
					 .get(endPoint)
					.end(function(err,res){
						callback(err,res);
					});
			});			
		});
};
exports.getOfOrderbyService = getOfOrderbyService;


 /**
 * @description: This method modify a out of order of  a spesific service Id 'out of order'
 * @param: callback
 * @res: modify the  out of order of a room id specific
 */
var putOrderbyService = function(token,callback){
	
		getRoomOutOfOrder(function(err,room){
			getEndPoint(function(err,res){
				    orderbyID = res.body[0]._id;
		         	endPoint1=outOfOrderbyServiceEndPoint.replace('{:serviceId}',room.serviceId);
		         	endPoint2=endPoint1.replace('{:roomId}',room._id);
					endPoint=endPoint2.replace('{:outOfOrderId}',orderbyID);
					request
					 .put(endPoint)
					 .set('Authorization','jwt '+token)
					 .send({
					 		from: util.getDate(1),
						   	to: util.getDate(2),
						   	title: "Temporarily Out of Order"}
						   )			 
					.end(function(err,res){
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

		getRoomOutOfOrder(function(err,room){
			getEndPoint(function(err,res){
				    orderbyID = res.body[0]._id;
		         	endPoint1=outOfOrderbyServiceEndPoint.replace('{:serviceId}',room.serviceId);
		         	endPoint2=endPoint1.replace('{:roomId}',room._id);
					endPoint=endPoint2.replace('{:outOfOrderId}',orderbyID);
					request
					 .del(endPoint)
					 .set('Authorization','jwt '+token)	
					.end(function(err,res){
						callback(err,res);
					});
			});			
		});
};
exports.delOrderbyService = delOrderbyService;


