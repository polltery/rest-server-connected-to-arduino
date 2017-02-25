
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
require('log-timestamp');

var five = require( 'johnny-five' ),board,led;
board = new five.Board(); 
   board.on("ready", function() {
     led = new five.Led(13);
     console.log("board is ready");
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
var routes = require("./routes.js")(app);
 
var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});

app.get('/on',function(req,res){

console.log("led on");
 if(board.isReady){ led.on();}
        console.log("light is turned on");
    res.redirect('/');  
});   

//app.get request on /off triggers turning off the LED
app.get('/off',function(req,res){

console.log("led off");
 if(board.isReady){ led.off();}
        console.log("light is turned off");
    res.redirect('/');  
}); 


var state = 'off';

// Headers must be : x-www-form-urlencoded
// Post example : {state : 0, key : 'test'}
app.post('/switch', function(req, res){

    console.log('Request recieved');
    console.log(req.body);

    // // Support two states, 1 = on, 0 = off
    // var state = req.body.state

    // For authentication purposes
    var key = req.body.key;

    if(key === 'test'){

        if(state === 'on'){
            state = 'off';
        }else{
            state = 'on';
        }

        if(state === 'on'){
            console.log("led on");
            if(board.isReady){ led.on();}
            console.log("light is turned on"); 
        }

        if(state === 'off'){
            console.log("led off");
            if (board.isReady) { led.off(); }
            console.log("light is turned off");
        }

    }

    res.end('Switch toggled');

});
