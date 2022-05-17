const myNotify = require("../notify")
module.exports = (req, res) => {
    myNotify.pushMsg(req.body)
    res.sendStatus(201)
}
