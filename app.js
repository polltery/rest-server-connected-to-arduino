
// Import libraries
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
require('log-timestamp');

// Initalise Johnny-five
var five = require('johnny-five'), board, led, led2;

// Create a board
board = new five.Board();

// Set led to pin 13 on ready
board.on("ready", function () {
    led = new five.Led(13);
    led2 = new five.Led(12);
    console.log("board is ready");
});

// Boilerplate code
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set server port
var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});

// ROUTES
// GET @ / | Home/Index request
app.get("/", function(req, res) {
    res.send("Welcome to AR Client server\n use the following endpoints to toggle the LED(s):<br>GET @ /toggle<br>GET @ /:led/toggle | led = 'led' or 'led2'<br>POST @ /switch <br>with body application/json {key:'secretKey'}");
    console.log('Request recieved');
});

// GET request @ /toggle | Toggle all the leds
app.get('/toggle', function (req, res) {

    // Toggle state of both led
    if (board.isReady){
        led.toggle();
        led2.toggle();
    }

    console.log("led(s) are toggled");
    res.redirect('/');

});

// GET request @ /toggle/:led | Toggle given :led
app.get('/toggle/:led', function (req, res) {

    var ledType = req.params.led;

    // Toggle state of both led
    if (board.isReady) {
        if(ledType === 'led'){
            led.toggle();
        }else{
            led2.toggle();
        }
    }
    console.log(ledType + " toggled");
    res.redirect('/');
});