const myNotify = require("../notify")
module.exports = (req, res) => {
    myNotify.register(req.body)
    res.sendStatus(201)
}