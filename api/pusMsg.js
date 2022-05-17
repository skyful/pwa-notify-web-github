const myNotify = require("../notify")
module.exports = (req, res) => {
    myNotify.pushMsg(req.body)
    res.send(
        JSON.stringify('success')
      );
}
