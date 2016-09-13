var express = require('express');
var router = express.Router();  

router.use(requestLogger);   

router.get('/api/getID', getID);
router.get('/api/shouts', getShouts);
router.post('/api/shouts', postShouts);

module.exports = router;

var USER_ID_COUNTER = 0;  // placeholders for random unique IDs
var SHOUT_ID_COUNTER = 0;  // placeholder for random unique ID
var EARSHOT = 1;  
var SHOUT_DB = [];  // placeholder for DB interaction
var WHISPER_DB = [];  // placeholder for DB interaction


function requestLogger(req, res, next) {
    console.log((new Date()) + ' Incoming requrest for ' +
      '\n\tURL: ' + req.url);
  next();
}


function getID(req, res) { 
  res.send({
  	uid : USER_ID_COUNTER,
  	secret : USER_ID_COUNTER
  });
  USER_ID_COUNTER++;
}

function getShouts(req, res) {
  var uid = req.query.uid;
  var lat = req.query.lat;
  var lon = req.query.lon;
 
  res.send(getAudibleShouts(lat, lon));
}

function postShouts(req, res) {
	var uid = req.params.uid;
	var lat = req.params.lat;
	var lon = req.params.lon;
	var displayName = req.params.displayName;
	var content = req.params.content;
    var sid = SHOUT_ID_COUNTER;
    SHOUT_ID_COUNTER++;

    SHOUT_DB.push(
    {
    	uid : uid,
    	lat : lat,
    	lon : lon,
    	displayName : displayName,
    	content : content,
    	sid : sid
    });

    res.send(getAudibleShouts(lat, lon));
}

function getAudibleShouts(lat, lon) {
	var idx = 0;
	var audible = [];
	for(idx = 0; idx < SHOUT_DB.length; idx++) {
		if(Math.abs(SHOUT_DB[i].lat - lat) <= EARSHOT &&
			Math.abs(SHOUT_DB[i].lon - lon) <= EARSHOT) {
          audible.push(SHOUT_DB[i]);
		}
	}
	return audible;
}