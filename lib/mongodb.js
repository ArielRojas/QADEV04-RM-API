/**
* mongodb.js by Brayan Rosas
*/
var config=require(GLOBAL.initialDirectory+'/config/config');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url=config.urlmongodb;
/**
 * Method that search a document of one collection
 * @findDocument(col,json,callback)
 * col : is the collection of where want to search the document
 * json : is a json , file where should be specified the property 
 * for wich want to search a doument and collback : is a asynchronous function
 * note: if you send a empty json , the function return all documents.
 * @return : It function return a callback with the document fouded in jason format.
 */
	var findDocument = function(col,json,callback) {
			MongoClient.connect(url, function(err, db) {
		 		var cursor =db.collection(col).find( json );
		   		cursor.each(function(err, doc) {
	      			if (doc != null) {
	        	 		callback(err,doc);
	     		 	}  
	     		 	db.close();
		  		}); 			
		   });			
	};



