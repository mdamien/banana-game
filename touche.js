var five = require("johnny-five");
var blessed = require('blessed'),
    contrib = require('blessed-contrib'),
    screen = blessed.screen();

var board = new five.Board({
    repl: false
});

var log = contrib.log(
  { fg: "green"
  , selectedFg: "green"
  , label: 'Log'})
log.log("new log line")
var data = {
        x: [],
        y: []
    };
var grid = new contrib.grid({rows: 1, cols: 5, screen: screen})
var log = grid.set(0, 4, 1, 1, contrib.log, { fg: "green"
  , selectedFg: "green"
  , label: 'Server Log'})
var line = grid.set(0, 0, 1, 4, contrib.line, {
        style: {
            line: "yellow",
            text: "green",
            baseline: "blue"
        },
        xLabelPadding: 3,
        xPadding: 5,
        label: 'Signal'
    })

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
});

screen.render()

board.on("ready", function() {
	var pwm = new five.Led(11);
	pwm.pulse(1000);
	var sensor = new five.Sensor({
		pin:'A0',
		freq:10
	});
	sensor.on('data', function() {
		data.x.push(new Date().getTime());
		data.y.push(this.value);
		log.log(""+this.value)
		var offset = 250;
		if (data.x.length > offset) {
			data.x = data.x.slice(-offset);
			data.y = data.y.slice(-offset);
		}
		line.setData([data]);
	})
});