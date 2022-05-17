
const myNotify = require("./notify")

module.exports.pushMsg = (req, res) => {
    myNotify.pushMsg(req.body)
    res.sendStatus(201)
}

module.exports.unregister = (req,res)=>{
    myNotify.unregister(req.body)
    res.sendStatus(201)
}