var five = require("johnny-five");
var player = require('play-sound')(opts = {})
var sfx = require("sfx");
var createMedianFilter = require('moving-median')

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
	    		play();
	    		led.off();
	    		led.fadeIn(100, function(){
	    			led.off();
	    		});
	    		led2.toggle();
		    	played = true;
		    }
	    } else {
	    	played = false
	    }
	});
}


board.on("ready", function() {
  led = new five.Led(3);
  led2 = new five.Led(13);
  createInstrument(0, function(){
  	sfx.glass(50);
  });
  /*
  createInstrument(2, function(){
   	sfx.tink(100);
  });
	*/
  createInstrument(5, function(){
  	var messages = [
  		"What ?",
  		"stop hitting me",
  		"knock knock",
  		"ceci n'est pas une pomme"
  	]
  	sfx.say(
  		messages[Math.floor(Math.random()*messages.length)],
  		"random");
  });
});