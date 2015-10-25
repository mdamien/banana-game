var five = require("johnny-five");
var board = new five.Board({
    repl: false
});

var data = {
        x: [],
        y: []
    }

board.on("ready", function() {
	var sensor = new five.Sensor('A0');
	sensor.on('data', function() {
		data.x.push(new Date().getTime());
		data.y.push(this.value);
		console.log(this.value)
		//line.setData([data]);
	})
});