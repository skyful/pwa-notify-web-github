const express = require('express')
const path = require("path")
var bodyParser = require('body-parser')
const cors = require("cors")
const myNotify = require("./notify")
//webpush.generateVAPIDKeys() 
const port = 8081
const app = express();

// Middleware for processing JSON objects.
var bodyParser = require('body-parser');
app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// A middle ware for serving static files
app.use('/', express.static(path.join(`${__dirname}/front-end`, '')))

app.listen(port, () => {
    console.log('Server running on port http://127.0.0.1:'+port+'...');
});



app.post('/register', (req, res) => {
    myNotify.register(req.body)
    res.sendStatus(201)
});
app.post('/unregister', (req, res) => {
    console.log("unregister",req.body)
    myNotify.unregister(req.body)
    res.sendStatus(201)
});
app.post("/pushMsg", (req, res) => {
    myNotify.pushMsg(req.body)
    res.sendStatus(201)
})