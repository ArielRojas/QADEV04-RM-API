//CRUD TC PGP public-key
//Miguel Angel Terceros Caballero

var expect = require('chai').expect;
//import libraries
var init = require('../../init');
var config = require(GLOBAL.initialDirectory+'/config/config.json');
var endPoints = require(GLOBAL.initialDirectory+config.path.endPoints);
var roomManagerAPI = require(GLOBAL.initialDirectory+config.path.roomManagerAPI);
var publicKey = require(GLOBAL.initialDirectory+'/config/publicKey.json');

//url
var publicKeyEndPoint = config.url + endPoints.publicKey;
//declare variables for structure of the key
var publicKeyBegin = publicKey.publicKeyStructure.publicKeyBegin; 
var publicKeyVersion = publicKey.publicKeyStructure.publicKeyVersion;
var publicKeyEnd = publicKey.publicKeyStructure.publicKeyEnd;
var publicKeyType = publicKey.publicKeyType;

describe('Smoke TC PGP public-key', function () {

	before(function (done) {
		this.timeout(config.timeOut);
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
		done();
	});	

	it('verify that the public-key contains an begin block, version, end block', function(done) {		  
						 
		roomManagerAPI
			.get(publicKeyEndPoint, function(err, res){	
				//getting substrings of public-key
				var cadena = res.body.content;
				//assersions begin, version, end block of the key
				expect(publicKeyType).to.equal(res.body.type);
				expect(publicKeyBegin).to.equal(cadena.substring(0,36));
				expect(publicKeyVersion).to.equal(cadena.substring(38,69));
				expect(publicKeyEnd).to.equal(cadena.substring(cadena.length-36, cadena.length-2));

				done();
			});
	});
});