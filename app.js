const express = require('express')
const path = require("path")
var bodyParser = require('body-parser')
const cors = require("cors")

//webpush.generateVAPIDKeys() 
const port = 8081
const app = express();

// Middleware for processing JSON objects.
var bodyParser = require('body-parser');
const register = require('./api/register')
const unregister = require('./api/unregister')
const pushmsg = require('./api/pushmsg')
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
    register(req,res)
   // res.sendStatus(201)
});
app.post('/unregister', (req, res) => {
    console.log("unregister",req.body)
    unregister(req,res)
   // res.sendStatus(201)
});
app.post("/pushmsg", (req, res) => {
    pushmsg(req,res)
})