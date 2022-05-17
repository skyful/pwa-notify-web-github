
const notify = require("./notify")
var myNotify = new notify()
module.exports.pushMsg = (req, res) => {
    myNotify.pushMsg(req.body)
    res.sendStatus(201)
}

module.exports.register = (req,res)=>{
    myNotify.register(req.body)
    res.sendStatus(201)
}

module.exports.unregister = (req,res)=>{
    myNotify.unregister(req.body)
    res.sendStatus(201)
}