const myNotify = require("../notify")
module.exports = (req, res) => {
    myNotify.unregister(req.body)
    res.send(
        JSON.stringify('success')
      );
}