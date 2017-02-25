
var appRouter = function(app) {

    app.get("/", function(req, res) {
        res.send("Hello World");
        console.log('Request recieved');
    });

};
 
module.exports = appRouter;