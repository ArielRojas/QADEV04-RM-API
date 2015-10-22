var request = require('superagent');
require('superagent-proxy')(request);

var getEndPoint=require('../config/endPoints.json');
var getConfig=require('../config/config.json');

/* End Points*/
var RoomEndPoint=getConfig.url+getEndPoint.room;        
var outOfOrderbyIDEndPoint=getConfig.url+getEndPoint.getOutOfOrder;
var outOrderPoint=getConfig.url+getEndPoint.outOfOrder;
var outOrderEndPoint=getConfig.url+getEndPoint.getOutOfOrderbyID;
var outOfOrderbyServiceEndPoint=getConfig.url+getEndPoint.getOutOfOrderbyService;
	

 /**
 * @description: This method get to Current date with diferent hours
 * @num: the number of the 
 * @res: return Current date 
 */

var getDate = function(num){
	var date = new Date();
	var aleatorio = (Math.round(Math.random()*23))+1;
	if(aleatorio<10){aleatorio='0'+aleatorio}
	if(num==0){aleatorio=24}
    var time = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getDate()+num)+'T'+aleatorio+':00:00.000Z';
	return time;
}

 /**
 * @description: This method get all the information that is in the body of the room 
 * @param: callback
 * @res: return the body of a room 
 */
var getRoom = function(callback){
	request
		.get(RoomEndPoint)
	.end(function(err,res){
         room = res.body[0];
		callback(room);
	});
};
exports.getRoom = getRoom;

 /**
 * @description: This method get all the room they are out of order
 * @param: callback
 * @res: return the out of order of the rooms in roommanager
 */
var getOfOrder = function(callback){
	request
		.get(outOrderPoint)
	.end(function(err,res){
		callback(res);
	});
};
exports.getOfOrder = getOfOrder;

 /**
 * @description: This method get out of order of a roomn by Id in roommanager
 * @param: callback
 * @res: return the out of order of the room 
 */
var getOfOrderbyID = function(callback){

		 getRoom(function(room){
		 var EndPoint1=outOfOrderbyIDEndPoint.replace('{:idService}',room.serviceId);
		 var EndPoint=EndPoint1.replace('{:idRoom}',room._id);
			request
				.get(EndPoint) 
			.end(function(err,res){
					callback(res);	
			});
	});
};
exports.getOfOrderbyID = getOfOrderbyID;



 /**
 * @description: This method created a out of order in a room spesific
 * @param: callback
 * @res: return the out of order of the room 
 */
var creategetOfOrder = function(token,callback){
	getRoom(function(room){
		 var EndPoint1=outOfOrderbyIDEndPoint.replace('{:idService}',room.serviceId);
		 var EndPoint=EndPoint1.replace('{:idRoom}',room._id);
			request
				.post(EndPoint)
				.set('Authorization','jwt '+token)
				.send({roomId:room._id,
						from:getDate(0),
						to: getDate(1),
						title: "Temporarily Out of Order",
						sendEmail: false})
			.end(function(err,res){
					callback(res);	
			});		
	});
};
exports.creategetOfOrder = creategetOfOrder;

 
 /**
 * @description: This method get all the out of order of a spesific room Id
 * @param: callback
 * @res: return the out of order of the room 
 */
var getEndPoint =function(callback){
	getRoom(function(room){
         var endPoint1= outOrderEndPoint.replace('{:serviceId}',room.serviceId);
		 var endPoint= endPoint1.replace('{:roomId}',room._id);			
		request
			.get(endPoint)	 
		.end(function(err,res){
				callback(res)
			});
	});
}
exports.getEndPoint = getEndPoint;
 /**
 * @description: This method get all the information of a room by a spesific service Id 'out of order'
 * @param: callback
 * @res: return the room with a out of order
 */
var getOfOrderbyService = function(callback){
	
		getRoom(function(room){
			getEndPoint(function(res){
				    orderbyID = res.body[0]._id;
		         	var endPoint1=outOfOrderbyServiceEndPoint.replace('{:serviceId}',room.serviceId);
		         	var endPoint2=endPoint1.replace('{:roomId}',room._id);
					var endPoint=endPoint2.replace('{:outOfOrderId}',orderbyID);
					request
					 .get(endPoint)
					.end(function(err,res){
						callback(res);
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
	
		getRoom(function(room){
			getEndPoint(function(res){
				    orderbyID = res.body[0]._id;
		         	var endPoint2=outOfOrderbyServiceEndPoint.replace('{:serviceId}',room.serviceId);
		         	var endPoint3=endPoint2.replace('{:roomId}',room._id);
					var endPoint4=endPoint3.replace('{:outOfOrderId}',orderbyID);
					request
					 .put(endPoint4)
					 .set('Authorization','jwt '+token)
					 .send({
					 		from: getDate(1),
						   	to: getDate(2),
						   	title: "Temporarily Out of Order"}
						   )			 
					.end(function(err,res){
						callback(res);
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

		getRoom(function(room){
			getEndPoint(function(res){
				    orderbyID = res.body[0]._id;
		         	var endPoint2=outOfOrderbyServiceEndPoint.replace('{:serviceId}',room.serviceId);
		         	var endPoint3=endPoint2.replace('{:roomId}',room._id);
					var endPoint4=endPoint3.replace('{:outOfOrderId}',orderbyID);
					request
					 .del(endPoint4)
					 .set('Authorization','jwt '+token)	
					.end(function(err,res){
						callback(res);
					});
			});			
		});
};
exports.delOrderbyService = delOrderbyService;


