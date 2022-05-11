const express = require('express')
const path = require("path")
var bodyParser = require('body-parser')
const webpush = require('web-push');
const cors = require("cors")
//webpush.generateVAPIDKeys() 
const vapidkey = {
    publicKey: 'BPSTO906RQvft9aGXxTE15CLji_xEVN2bCjYnk5bcr5cPm0EaDOs1NMlRzNVn9NZxHY2KIzpvx0bpPfAnP8ale8',
    privateKey:'fER5Cn-VypUYwjLSmAzRFtMK3NpHK0bHr1hEkhVdG4I'
}
var subscriptionList =[]
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

    for (sub of subscriptionList) {
        if (sub.endpoint == req.body.subscription.endpoint) {
            return res.sendStatus(201)
        }
    }
    subscriptionList.push(req.body.subscription)
    console.log("register web",JSON.stringify(req.body.subscription))
    res.sendStatus(201)
});
app.post('/unregister', (req, res) => {
    console.log("unregister",req.body)
    for (let i = 0; i < subscriptionList.length;++i ) {
        if (subscriptionList[i].endpoint == req.body.subscription.endpoint) {
            console.log("delete ",req.body.subscription.endpoint)
            subscriptionList.splice(i,1)
        }
    }
    res.sendStatus(201)
});
app.post("/pushMsg", (req, res) => {
    console.log("push message", req.body)
    webpush.setGCMAPIKey('AAAAE7EM338:APA91bHNziRBD3n5bAuxb2HdlQEco24sTiG3nGn4PJKfg1t4ObCcG2P3wAZAMBPscInAJGH1HMDUlESR_Ye4RYE61IEh9sV5O7aSZtV8gbxIRdHfFcf8KosiqNzixEkG2mBwZvn6gbg7')
    // 设置 VAPID
    webpush.setVapidDetails(
        'https://my-site.com/contact',
        vapidkey.publicKey,
        vapidkey.privateKey
    );
    for (let subscription of subscriptionList) {
        console.log("subscript", JSON.stringify(subscription))
        // 消息推送
        webpush
            .sendNotification(
                subscription,
                JSON.stringify({
                    msg: req.body.message,
                    url: "www.baidu.com",
                    icon:""
                })
                
            )
            .then(result => {
                console.log("push success")
                res.sendStatus(201)
            } )
            .catch(err => console.log("push err",err));
    }
   
    
   
})