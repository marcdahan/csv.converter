var Express = require('express');
var app = Express();

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/api/Upload", function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded sucessfully!.");
    });
});

app.listen(2000, function (a) {
    console.log("Listening to port 2000");
});