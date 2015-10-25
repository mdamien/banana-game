var five = require("johnny-five");
var player = require('play-sound')(opts = {})
var sfx = require("sfx");
var createMedianFilter = require('moving-median')
var robot = require("robotjs");

var board = new five.Board();

var led, led2;

function createInstrument(i, play) {
  	var ai = "A"+i;
	var sensor = new five.Sensor({
	  pin: ai,
	});
	var median = createMedianFilter(5)
	var played = false;
	sensor.on("data", function() {
		var v = median(this.value);
	    if (v < 100) {
	    	if (!played) {
	    		console.log(ai, 'play !', v)
	    		robot.keyToggle("space", 'down');
	    		play();
		    	played = true;
		    }
	    } else {
	    	if(played) {
	    		robot.keyToggle("space", 'up');
	    		console.log('up!')
	    	}
	    	played = false  
	    	
	    }
	});
}


board.on("ready", function() {
  createInstrument(0, function(){
  	sfx.glass();
  });
});