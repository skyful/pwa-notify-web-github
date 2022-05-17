const myNotify = require("../notify")
module.exports = (req, res) => {
    myNotify.unregister(req.body).then(d => {
        res.send(
            JSON.stringify('success')
        );
    }, e => {
        res.send(
            JSON.stringify('failed')
        );
    })
}